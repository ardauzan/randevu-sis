//info Burda uygulamayı çalıştıran sunucu tarafı mantığı tanımlıyoruz.
import { eq, like, or, count } from 'drizzle-orm'
import veritabanı from '@/veritabanı'
import { kişiler } from '@/veritabanı/şema'

//# Kimlik doğrulama ve yönetim işlemleri için tanımlanan mantıklar

//info Bir string al.
//info Aldığın stringi Argon2id fonksiyonunu kullanarak hashle.
//info Elde ettiğin hash i döndür.
export async function stringiHashle(str: string): Promise<string> {
  return Bun.password.hash(str)
}

//info İki string al.
//info İkinci string birinci stringin Argon2id fonksiyonu ile hashlenmiş halimi kontrol et.
//info Sonuç pozitifse true, negatifse false döndür.
export function hashlenmişStringiAnahtarıylaÇözmeyeÇalış(
  str: string,
  hash: string
): Promise<boolean> {
  return Bun.password.verify(str, hash)
}

//info Bir değer al.
//info Bu değer kimlik adıyla tanımlanan çerezin bir misali mi kontrol et.
//info Eğer öyleyse true, değilse false döndür.
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
//info Bir değer al.
//info Bu değer kimlik adıyla tanımlanan çerezin bir misali mi kontrol et.
//info Eğer öyleyse bu çerezin id'sini ve kimlik durumunu döndür, değilse [0, 'yok'] döndür.
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

//info Bir kimlik verisi ve bir sayfa adı al, bir de navigasyon objesi al.
//info Bu kimlik verisi o sayfayı görebilir mi, navigasyon objesine bakarak karar ver.
//info Eğer görebilirse true, göremiyorsa false döndür.
export async function kimlikVerisiSayfayıGörebilirMi(
  kimlikVerisi: KimlikVerisi,
  sayfa: string,
  navigasyon: Navigasyon
): Promise<boolean> {
  const [_, durum] = kimlikVerisi
  return navigasyon[sayfa]![2].includes(durum)
}

//info Bir email ve şifre al.
//info Aldığın email bir kullanıcıya denk geliyormu bak, geliyorsa şifre o kullanıcının şifresine denk geliyormu bak.
//info Bu adımlar tamamsa true döndür, bir adım tamam değilse false döndür.

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

//info Yönetici api si

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
