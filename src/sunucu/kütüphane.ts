import { eq, like, or, count } from 'drizzle-orm'
import veritabanı from '@/veritabanı'
import { kişiler, projeler, kişilerProjeler } from '@/veritabanı/şema'

//# Kimlik
export function değerKimlikÇerezininMisalimi(
  değer: unknown
): değer is KimlikÇerezi {
  return (
    typeof değer === 'object' &&
    değer !== null &&
    Object.keys(değer).length === 1 &&
    'id' in değer &&
    typeof değer.id === 'number' &&
    değer.id > 0
  )
}
export async function kimlikVerisiniAl(değer: unknown): Promise<KimlikVerisi> {
  const negatifSonuç: [0, 'yok'] = [0, 'yok']
  if (!değerKimlikÇerezininMisalimi(değer)) return negatifSonuç
  const kullanıcı = await veritabanı.query.kişiler.findFirst({
    where: eq(kişiler.id, değer.id),
    columns: {
      yönetici: true
    }
  })
  if (!kullanıcı) return negatifSonuç
  return [değer.id, kullanıcı.yönetici ? 'yönetici' : 'kullanıcı']
}
export async function kimlikVerisiSayfayıGörebilirMi(
  kimlikVerisi: KimlikVerisi,
  sayfa: string,
  navigasyon: Navigasyon
): Promise<boolean> {
  const [_id, durum] = kimlikVerisi
  return navigasyon[sayfa]![2].includes(durum)
}
export async function emailVeŞifreİleKimlikDoğrula(
  email: string,
  şifre: string
): Promise<'Kimlik doğrulanamadı.' | number> {
  const negatifSonuç = 'Kimlik doğrulanamadı.'
  const kullanıcı = await veritabanı.query.kişiler.findFirst({
    where: eq(kişiler.email, email),
    columns: {
      id: true,
      şifreHash: true
    }
  })
  if (!kullanıcı) return negatifSonuç
  const { id, şifreHash } = kullanıcı
  return (await hashlenmişStringiAnahtarıylaÇözmeyeÇalış(şifre, şifreHash))
    ? id
    : negatifSonuç
}

//# Veritabanı
export async function kişileriYöneticiİçinSay(arama: string): Promise<number> {
  const sonuç = await veritabanı
    .select({ count: count() })
    .from(kişiler)
    .where(
      or(
        like(kişiler.ad, `%${arama}%`),
        like(kişiler.soyAd, `%${arama}%`),
        like(kişiler.email, `%${arama}%`)
      )
    )
  return sonuç[0]!.count
}
export async function kişileriYöneticiİçinListele(
  arama: string,
  sayfa: number,
  sayfaBoyutu: number
): Promise<ListelenenKişi[]> {
  return veritabanı.query.kişiler.findMany({
    where: or(
      like(kişiler.ad, `%${arama}%`),
      like(kişiler.soyAd, `%${arama}%`),
      like(kişiler.email, `%${arama}%`)
    ),
    offset: (sayfa - 1) * sayfaBoyutu,
    limit: sayfaBoyutu,
    columns: {
      id: true,
      öğrenciNo: true,
      ad: true,
      soyAd: true,
      email: true
    }
  })
}

export async function kişiyiYöneticiİçinDetaylıOku(
  id: number
): Promise<DetaylıKişi | null> {
  const res = await veritabanı.query.kişiler.findFirst({
    where: eq(kişiler.id, id),
    columns: {
      id: true,
      yönetici: true,
      öğrenciNo: true,
      ad: true,
      soyAd: true,
      email: true,
      şifreHash: true
    },
    with: {
      projeler: {
        columns: {
          proje: true
        },
        with: {
          proje: {
            columns: {
              id: true,
              ad: true,
              başlangıçTarihi: true,
              bitişTarihi: true,
              açıklama: true
            }
          }
        }
      }
    }
  })
  if (!res) return null
  return {
    id: res.id,
    yönetici: res.yönetici,
    öğrenciNo: res.öğrenciNo,
    ad: res.ad,
    soyad: res.soyAd,
    email: res.email,
    şifreHash: res.şifreHash,
    projeler: res.projeler.map((p) => p.proje)
  }
}

export async function yöneticiİçinKişiEkle(
  oluşturulacakKişi: OluşturulacakKişi
): Promise<'Kişi eklendi.'> {
  const { şifre, projeler, ...kişi } = oluşturulacakKişi
  const şifresiHashlenmişOluşturulacakKişi = {
    ...kişi,
    şifreHash: await stringiHashle(şifre)
  }
  await veritabanı.transaction(async (tx) => {
    const sonuç = await tx
      .insert(kişiler)
      .values([şifresiHashlenmişOluşturulacakKişi])
      .returning({ id: kişiler.id })
    if (projeler.length)
      await tx.insert(kişilerProjeler).values(
        projeler.map((proje) => ({
          üye: sonuç[0]!.id,
          proje
        }))
      )
  })
  return 'Kişi eklendi.'
}

export async function yöneticiİçinKişiGüncelle(
  id: number,
  güncellenecekKişi: OluşturulacakKişi
): Promise<'Kişi güncellendi.'> {
  const { şifre, projeler, ...kişi } = güncellenecekKişi
  const şifresiHashlenmişGüncellenecekKişi = {
    ...kişi,
    ...(şifre && { şifreHash: await stringiHashle(şifre) })
  }
  await veritabanı.transaction(async (tx) => {
    await tx
      .update(kişiler)
      .set(şifresiHashlenmişGüncellenecekKişi)
      .where(eq(kişiler.id, id))
    await tx.delete(kişilerProjeler).where(eq(kişilerProjeler.üye, id))
    if (projeler.length)
      await tx.insert(kişilerProjeler).values(
        projeler.map((proje) => ({
          üye: id,
          proje
        }))
      )
  })
  return 'Kişi güncellendi.'
}

export async function yöneticiİçinKişiSil(
  id: number
): Promise<'Kişi silindi.'> {
  await veritabanı.transaction(async (tx) => {
    await tx.delete(kişilerProjeler).where(eq(kişilerProjeler.üye, id))
    const sonuç = await tx
      .delete(kişiler)
      .where(eq(kişiler.id, id))
      .returning({ id: kişiler.id })
    if (!sonuç.length) await tx.rollback()
  })
  return 'Kişi silindi.'
}

//# Diğer
export async function stringiHashle(str: string): Promise<string> {
  return Bun.password.hash(str)
}
export function hashlenmişStringiAnahtarıylaÇözmeyeÇalış(
  str: string,
  hash: string
): Promise<boolean> {
  return Bun.password.verify(str, hash)
}
