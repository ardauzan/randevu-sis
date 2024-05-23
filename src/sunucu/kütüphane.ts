import { eq, like, or, count } from 'drizzle-orm'
import { veritabanı } from '@/index'
import {
  kişiler,
  projeler,
  kişilerProjeler,
  gereçler,
  araçlar,
  randevular,
  gereçlerRandevular,
  araçlarRandevular,
  tatiller,
  ziyaretler
} from '@/veritabanı/şema'

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
    soyAd: res.soyAd,
    email: res.email,
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
export async function projeleriYöneticiİçinSay(arama: string): Promise<number> {
  return veritabanı
    .select({ count: count() })
    .from(projeler)
    .where(like(projeler.ad, `%${arama}%`))
    .then((res) => res[0]!.count)
}
export async function projeleriYöneticiİçinListele(
  arama: string,
  sayfa: number,
  sayfaBoyutu: number
): Promise<ListelenenProje[]> {
  return veritabanı.query.projeler.findMany({
    where: like(projeler.ad, `%${arama}%`),
    offset: (sayfa - 1) * sayfaBoyutu,
    limit: sayfaBoyutu,
    columns: {
      id: true,
      ad: true,
      başlangıçTarihi: true,
      bitişTarihi: true,
      açıklama: true
    }
  })
}
export async function projeyiYöneticiİçinDetaylıOku(
  id: number
): Promise<DetaylıProje | null> {
  const sonuç = await veritabanı.query.projeler.findFirst({
    where: eq(projeler.id, id),
    columns: {
      id: true,
      ad: true,
      başlangıçTarihi: true,
      bitişTarihi: true,
      açıklama: true
    },
    with: {
      üyeler: {
        columns: {
          üye: true
        },
        with: {
          üye: {
            columns: {
              id: true,
              öğrenciNo: true,
              ad: true,
              soyAd: true,
              email: true
            }
          }
        }
      }
    }
  })
  if (!sonuç) return null
  return {
    id: sonuç.id,
    ad: sonuç.ad,
    başlangıçTarihi: sonuç.başlangıçTarihi,
    bitişTarihi: sonuç.bitişTarihi,
    açıklama: sonuç.açıklama,
    üyeler: sonuç.üyeler.map((üye) => üye.üye)
  }
}
export async function yöneticiİçinProjeEkle(
  oluşturulacakProje: OluşturulacakProje
): Promise<'Proje eklendi.'> {
  const { üyeler, ...proje } = oluşturulacakProje
  await veritabanı.transaction(async (tx) => {
    const sonuç = await tx
      .insert(projeler)
      .values([proje])
      .returning({ id: projeler.id })
    if (üyeler.length)
      await tx.insert(kişilerProjeler).values(
        üyeler.map((üye) => ({
          üye,
          proje: sonuç[0]!.id
        }))
      )
  })
  return 'Proje eklendi.'
}
export async function yöneticiİçinProjeGüncelle(
  id: number,
  güncellenecekProje: OluşturulacakProje
): Promise<'Proje güncellendi.'> {
  await veritabanı.transaction(async (tx) => {
    await tx.update(projeler).set(güncellenecekProje).where(eq(projeler.id, id))
    await tx.delete(kişilerProjeler).where(eq(kişilerProjeler.proje, id))
    if (güncellenecekProje.üyeler.length)
      await tx.insert(kişilerProjeler).values(
        güncellenecekProje.üyeler.map((üye) => ({
          üye,
          proje: id
        }))
      )
  })
  return 'Proje güncellendi.'
}
export async function yöneticiİçinProjeSil(
  id: number
): Promise<'Proje silindi.'> {
  await veritabanı.transaction(async (tx) => {
    await tx.delete(kişilerProjeler).where(eq(kişilerProjeler.proje, id))
    const ilişkiliRandevular = await tx
      .select({ id: randevular.id })
      .from(randevular)
      .where(eq(randevular.proje, id))
    for (const randevu of ilişkiliRandevular) {
      await tx
        .delete(gereçlerRandevular)
        .where(eq(gereçlerRandevular.randevu, randevu.id))
      await tx
        .delete(araçlarRandevular)
        .where(eq(araçlarRandevular.randevu, randevu.id))
    }
    await tx.delete(randevular).where(eq(randevular.proje, id))
    const sonuç = await tx
      .delete(projeler)
      .where(eq(projeler.id, id))
      .returning({ id: projeler.id })
    if (!sonuç.length) await tx.rollback()
  })
  return 'Proje silindi.'
}
export async function gereçleriYöneticiİçinSay(arama: string): Promise<number> {
  return veritabanı
    .select({ count: count() })
    .from(gereçler)
    .where(like(gereçler.ad, `%${arama}%`))
    .then((res) => res[0]!.count)
}
export async function gereçleriYöneticiİçinListele(
  arama: string,
  sayfa: number,
  sayfaBoyutu: number
): Promise<ListelenenGereç[]> {
  return veritabanı.query.gereçler.findMany({
    where: like(gereçler.ad, `%${arama}%`),
    offset: (sayfa - 1) * sayfaBoyutu,
    limit: sayfaBoyutu,
    columns: {
      id: true,
      ad: true,
      adet: true
    }
  })
}
export async function gereciYöneticiİçinDetaylıOku(
  id: number
): Promise<ListelenenGereç | null> {
  const sonuç = await veritabanı.query.gereçler.findFirst({
    where: eq(gereçler.id, id),
    columns: {
      id: true,
      ad: true,
      adet: true
    }
  })
  if (!sonuç) return null
  return sonuç
}
export async function yöneticiİçinGereçEkle(
  oluşturulacakGereç: OluşturulacakGereç
): Promise<'Gereç eklendi.'> {
  await veritabanı.insert(gereçler).values([oluşturulacakGereç])
  return 'Gereç eklendi.'
}
export async function yöneticiİçinGereçGüncelle(
  id: number,
  güncellenecekGereç: OluşturulacakGereç
): Promise<'Gereç güncellendi.'> {
  await veritabanı
    .update(gereçler)
    .set(güncellenecekGereç)
    .where(eq(gereçler.id, id))
  return 'Gereç güncellendi.'
}
export async function yöneticiİçinGereçSil(
  id: number
): Promise<'Gereç silindi.'> {
  await veritabanı
    .delete(gereçlerRandevular)
    .where(eq(gereçlerRandevular.gereç, id))
  await veritabanı.delete(gereçler).where(eq(gereçler.id, id))
  return 'Gereç silindi.'
}
export async function araçlarıYöneticiİçinSay(arama: string): Promise<number> {
  return veritabanı
    .select({ count: count() })
    .from(araçlar)
    .where(like(araçlar.ad, `%${arama}%`))
    .then((res) => res[0]!.count)
}
export async function araçlarıYöneticiİçinListele(
  arama: string,
  sayfa: number,
  sayfaBoyutu: number
): Promise<ListelenenAraç[]> {
  return veritabanı.query.araçlar.findMany({
    where: like(araçlar.ad, `%${arama}%`),
    offset: (sayfa - 1) * sayfaBoyutu,
    limit: sayfaBoyutu,
    columns: {
      id: true,
      ad: true,
      açıklama: true,
      arızalı: true
    }
  })
}
export async function aracıYöneticiİçinDetaylıOku(
  id: number
): Promise<ListelenenAraç | null> {
  const sonuç = await veritabanı.query.araçlar.findFirst({
    where: eq(araçlar.id, id),
    columns: {
      id: true,
      ad: true,
      açıklama: true,
      arızalı: true
    }
  })
  if (!sonuç) return null
  return sonuç
}
export async function yöneticiİçinAraçEkle(
  oluşturulacakAraç: OluşturulacakAraç
): Promise<'Araç eklendi.'> {
  await veritabanı.insert(araçlar).values([oluşturulacakAraç])
  return 'Araç eklendi.'
}
export async function yöneticiİçinAraçGüncelle(
  id: number,
  güncellenecekAraç: OluşturulacakAraç
): Promise<'Araç güncellendi.'> {
  await veritabanı
    .update(araçlar)
    .set(güncellenecekAraç)
    .where(eq(araçlar.id, id))
  return 'Araç güncellendi.'
}
export async function yöneticiİçinAraçSil(
  id: number
): Promise<'Araç silindi.'> {
  await veritabanı
    .delete(araçlarRandevular)
    .where(eq(araçlarRandevular.araç, id))
  await veritabanı.delete(araçlar).where(eq(araçlar.id, id))
  return 'Araç silindi.'
}
export async function randevularıYöneticiİçinSay(
  arama: string
): Promise<number> {
  return veritabanı
    .select({ count: count() })
    .from(randevular)
    .where(like(randevular.açıklama, `%${arama}%`))
    .then((res) => res[0]!.count)
}
export async function randevularıYöneticiİçinListele(
  arama: string,
  sayfa: number,
  sayfaBoyutu: number
): Promise<ListelenenRandevu[]> {
  return veritabanı.query.randevular.findMany({
    where: like(randevular.açıklama, `%${arama}%`),
    offset: (sayfa - 1) * sayfaBoyutu,
    limit: sayfaBoyutu,
    columns: {
      id: true,
      açıklama: true,
      proje: true,
      gün: true,
      başlangıçZamanı: true,
      bitişZamanı: true
    }
  })
}
export async function randevuyuYöneticiİçinDetaylıOku(
  id: number
): Promise<DetaylıRandevu | null> {
  const sonuç = await veritabanı.query.randevular.findFirst({
    where: eq(randevular.id, id),
    columns: {
      id: true,
      açıklama: true,
      gün: true,
      başlangıçZamanı: true,
      bitişZamanı: true
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
      },
      gereçler: {
        columns: {
          gereç: true,
          adet: true
        },
        with: {
          gereç: {
            columns: {
              id: true,
              ad: true,
              adet: true
            }
          }
        }
      },
      araçlar: {
        columns: {
          araç: true
        },
        with: {
          araç: {
            columns: {
              id: true,
              ad: true,
              açıklama: true,
              arızalı: true
            }
          }
        }
      }
    }
  })
  if (!sonuç) return null
  return {
    id: sonuç.id,
    açıklama: sonuç.açıklama,
    proje: sonuç.proje,
    gün: sonuç.gün,
    başlangıçZamanı: sonuç.başlangıçZamanı,
    bitişZamanı: sonuç.bitişZamanı,
    gereçler: sonuç.gereçler.map((g) => [g.adet, g.gereç]),
    araçlar: sonuç.araçlar.map((a) => a.araç)
  }
}
export async function yöneticiİçinRandevuEkle(
  oluşturulacakRandevu: OluşturulacakRandevu
): Promise<'Randevu eklendi.'> {
  const { gereçler, araçlar, ...randevu } = oluşturulacakRandevu
  await veritabanı.transaction(async (tx) => {
    const sonuç = await tx
      .insert(randevular)
      .values([randevu])
      .returning({ id: randevular.id })
    if (gereçler.length)
      await tx.insert(gereçlerRandevular).values(
        gereçler.map(([adet, gereç]) => ({
          randevu: sonuç[0]!.id,
          gereç,
          adet
        }))
      )
    if (araçlar.length)
      await tx.insert(araçlarRandevular).values(
        araçlar.map((araç) => ({
          randevu: sonuç[0]!.id,
          araç
        }))
      )
  })
  return 'Randevu eklendi.'
}
export async function yöneticiİçinRandevuGüncelle(
  id: number,
  güncellenecekRandevu: OluşturulacakRandevu
): Promise<'Randevu güncellendi.'> {
  const { gereçler, araçlar, ...randevu } = güncellenecekRandevu
  await veritabanı.transaction(async (tx) => {
    await tx.update(randevular).set(randevu).where(eq(randevular.id, id))
    await tx
      .delete(gereçlerRandevular)
      .where(eq(gereçlerRandevular.randevu, id))
    await tx.delete(araçlarRandevular).where(eq(araçlarRandevular.randevu, id))
    if (gereçler.length)
      await tx.insert(gereçlerRandevular).values(
        gereçler.map(([adet, gereç]) => ({
          randevu: id,
          gereç,
          adet
        }))
      )
    if (araçlar.length)
      await tx.insert(araçlarRandevular).values(
        araçlar.map((araç) => ({
          randevu: id,
          araç
        }))
      )
  })
  return 'Randevu güncellendi.'
}
export async function yöneticiİçinRandevuSil(
  id: number
): Promise<'Randevu silindi.'> {
  await veritabanı.transaction(async (tx) => {
    await tx
      .delete(gereçlerRandevular)
      .where(eq(gereçlerRandevular.randevu, id))
    await tx.delete(araçlarRandevular).where(eq(araçlarRandevular.randevu, id))
    await tx
      .delete(gereçlerRandevular)
      .where(eq(gereçlerRandevular.randevu, id))
    await tx.delete(araçlarRandevular).where(eq(araçlarRandevular.randevu, id))
    const sonuç = await tx
      .delete(randevular)
      .where(eq(randevular.id, id))
      .returning({ id: randevular.id })
    if (!sonuç.length) await tx.rollback()
  })
  return 'Randevu silindi.'
}
export async function tatilleriYöneticiİçinSay(arama: string): Promise<number> {
  return veritabanı
    .select({ count: count() })
    .from(tatiller)
    .where(like(tatiller.açıklama, `%${arama}%`))
    .then((res) => res[0]!.count)
}
export async function tatilleriYöneticiİçinListele(
  arama: string,
  sayfa: number,
  sayfaBoyutu: number
): Promise<ListelenenTatil[]> {
  return veritabanı.query.tatiller.findMany({
    where: like(tatiller.açıklama, `%${arama}%`),
    offset: (sayfa - 1) * sayfaBoyutu,
    limit: sayfaBoyutu,
    columns: {
      id: true,
      başlangıçTarihi: true,
      bitişTarihi: true,
      açıklama: true
    }
  })
}
export async function tatiliYöneticiİçinDetaylıOku(
  id: number
): Promise<ListelenenTatil | null> {
  const sonuç = await veritabanı.query.tatiller.findFirst({
    where: eq(tatiller.id, id),
    columns: {
      id: true,
      başlangıçTarihi: true,
      bitişTarihi: true,
      açıklama: true
    }
  })
  if (!sonuç) return null
  return sonuç
}
export async function yöneticiİçinTatilEkle(
  oluşturulacakTatil: OluşturulacakTatil
): Promise<'Tatil eklendi.'> {
  await veritabanı.insert(tatiller).values([oluşturulacakTatil])
  return 'Tatil eklendi.'
}
export async function yöneticiİçinTatilGüncelle(
  id: number,
  güncellenecekTatil: OluşturulacakTatil
): Promise<'Tatil güncellendi.'> {
  await veritabanı
    .update(tatiller)
    .set(güncellenecekTatil)
    .where(eq(tatiller.id, id))
  return 'Tatil güncellendi.'
}
export async function yöneticiİçinTatilSil(
  id: number
): Promise<'Tatil silindi.'> {
  await veritabanı.delete(tatiller).where(eq(tatiller.id, id))
  return 'Tatil silindi.'
}
export async function ziyaretleriYöneticiİçinSay(
  arama: string
): Promise<number> {
  return veritabanı
    .select({ count: count() })
    .from(ziyaretler)
    .where(like(ziyaretler.ziyaretEden, `%${arama}%`))
    .then((res) => res[0]!.count)
}
export async function ziyaretleriYöneticiİçinListele(
  arama: string,
  sayfa: number,
  sayfaBoyutu: number
): Promise<ListelenenZiyaret[]> {
  return veritabanı.query.ziyaretler.findMany({
    where: like(ziyaretler.ziyaretEden, `%${arama}%`),
    offset: (sayfa - 1) * sayfaBoyutu,
    limit: sayfaBoyutu,
    columns: {
      id: true,
      gün: true,
      başlangıçZamanı: true,
      bitişZamanı: true,
      ziyaretEden: true,
      ziyaretçiSayısı: true
    }
  })
}
export async function ziyaretiYöneticiİçinDetaylıOku(
  id: number
): Promise<ListelenenZiyaret | null> {
  const sonuç = await veritabanı.query.ziyaretler.findFirst({
    where: eq(ziyaretler.id, id),
    columns: {
      id: true,
      gün: true,
      başlangıçZamanı: true,
      bitişZamanı: true,
      ziyaretEden: true,
      ziyaretçiSayısı: true
    }
  })
  if (!sonuç) return null
  return sonuç
}
export async function yöneticiİçinZiyaretEkle(
  oluşturulacakZiyaret: OluşturulacakZiyaret
): Promise<'Ziyaret eklendi.'> {
  await veritabanı.insert(ziyaretler).values([oluşturulacakZiyaret])
  return 'Ziyaret eklendi.'
}
export async function yöneticiİçinZiyaretGüncelle(
  id: number,
  güncellenecekZiyaret: OluşturulacakZiyaret
): Promise<'Ziyaret güncellendi.'> {
  await veritabanı
    .update(ziyaretler)
    .set(güncellenecekZiyaret)
    .where(eq(ziyaretler.id, id))
  return 'Ziyaret güncellendi.'
}
export async function yöneticiİçinZiyaretSil(
  id: number
): Promise<'Ziyaret silindi.'> {
  await veritabanı.delete(ziyaretler).where(eq(ziyaretler.id, id))
  return 'Ziyaret silindi.'
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
export function trueVeyaFalseuBaşarılıyaDönüştür(
  değer: boolean
): 'Başarılı' | 'Başarısız' {
  return değer ? 'Başarılı' : 'Başarısız'
}

export function uygulamaBirSüreÇalıştıktanSonraKapatıldı() {
  console.info(
    `Uygulama ${Bun.nanoseconds()} nanosaniye çalıştıktan sonra kapatıldı.`
  )
}
