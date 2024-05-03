//info Burda uygulamayı çalıştıran sunucu tarafı mantığı tanımlıyoruz.
import { eq } from 'drizzle-orm'
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
  value: unknown
): value is { id: number } & { [key: string]: never } {
  return (
    typeof value === 'object' &&
    value !== null &&
    Object.keys(value).length === 1 &&
    'id' in value &&
    typeof value.id === 'number' &&
    value.id > 0
  )
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
