import { eq, like, or, count } from 'drizzle-orm'
import veritabanı from '@/veritabanı'
import { kişiler } from '@/veritabanı/şema'

export async function stringiHashle(str: string): Promise<string> {
  return Bun.password.hash(str)
}

export function hashlenmişStringiAnahtarıylaÇözmeyeÇalış(
  str: string,
  hash: string
): Promise<boolean> {
  return Bun.password.verify(str, hash)
}

export function değerKimlikÇerezininMisalimi(
  değer: unknown
): değer is { id: number } & { [key: string]: never } {
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
  const [_, durum] = kimlikVerisi
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

export async function kişilerSay(arama: string): Promise<number> {
  const sonuç = await veritabanı
    .select({ count: count() })
    .from(kişiler)
    .where(
      or(like(kişiler.ad, `%${arama}%`), like(kişiler.email, `%${arama}%`))
    )
  return sonuç[0]!.count
}

export async function kişileriListele(
  arama: string,
  sayfa: number,
  sayfaBoyutu: number
): Promise<ListelenenKişi[]> {
  return veritabanı.query.kişiler.findMany({
    where: or(
      like(kişiler.ad, `%${arama}%`),
      like(kişiler.email, `%${arama}%`)
    ),
    offset: (sayfa - 1) * sayfaBoyutu,
    limit: sayfaBoyutu,
    columns: {
      id: true,
      yönetici: true,
      öğrenciNo: true,
      ad: true,
      soyAd: true,
      email: true
    }
  })
}
