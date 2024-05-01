//info Burda uygulamayı çalıştıran sunucu tarafı mantığı tanımlıyoruz.
import { count, like, or, eq } from 'drizzle-orm'
import db from '@/db'
import { kişiler, projeler, kişilerProjeler } from '@/db/schema'

//info Kişi işlemleri

//# Kişileri say
export async function kişileriSay(arama: string): Promise<number | void> {
  const res = await db
    .select({ count: count() })
    .from(kişiler)
    .where(
      or(
        or(like(kişiler.ad, `%${arama}%`), like(kişiler.soyAd, `%${arama}%`)),
        like(kişiler.email, `%${arama}%`)
      )
    )
  return res[0]?.count
}

//# Kişileri oku
export async function kişileriOku(
  arama: string,
  sayfa: number,
  sayfaBoyutu: number
): Promise<SunucuKaynaklıKişiler | void> {
  const res = await db.query.kişiler.findMany({
    where: or(
      or(like(kişiler.ad, `%${arama}%`), like(kişiler.soyAd, `%${arama}%`)),
      like(kişiler.email, `%${arama}%`)
    ),
    limit: sayfaBoyutu,
    offset: (sayfa - 1) * sayfaBoyutu,
    columns: {
      şifreHash: false
    },
    with: {
      projeler: {
        columns: {},
        with: {
          proje: {
            columns: {
              id: true
            }
          }
        }
      }
    }
  })
  const processedRes: SunucuKaynaklıKişiler = []
  for (const kişi of res) {
    processedRes.push({
      id: kişi.id,
      öğrenciNo: kişi.öğrenciNo,
      ad: kişi.ad,
      soyAd: kişi.soyAd,
      email: kişi.email,
      projeler: kişi.projeler.map((kişiProje) => kişiProje.proje.id)
    })
  }
  return processedRes
}

//# Kişi oku
export async function kişiOku(
  id: number,
  şifreli: boolean = false
): Promise<SunucuKaynaklıKişi | void> {
  if (şifreli) {
    const res = await db.query.kişiler.findFirst({
      where: eq(kişiler.id, id),
      with: {
        projeler: {
          columns: {},
          with: {
            proje: true
          }
        }
      }
    })
    if (!res) return
    const processedRes: SunucuKaynaklıKişi = {
      id: res.id,
      öğrenciNo: res.öğrenciNo,
      ad: res.ad,
      soyAd: res.soyAd,
      email: res.email,
      projeler: res.projeler.map((kişiProje) => kişiProje.proje)
    }
    return processedRes
  }
  const res = await db.query.kişiler.findFirst({
    where: eq(kişiler.id, id),
    columns: {
      şifreHash: false
    },
    with: {
      projeler: {
        columns: {},
        with: {
          proje: true
        }
      }
    }
  })
  if (!res) return
  const processedRes: SunucuKaynaklıKişi = {
    id: res.id,
    öğrenciNo: res.öğrenciNo,
    ad: res.ad,
    soyAd: res.soyAd,
    email: res.email,
    projeler: res.projeler.map((kişiProje) => kişiProje.proje)
  }
  return processedRes
}

//# Kişi yarat
export async function kişiYarat(
  öğrenciNo: number,
  ad: string,
  soyAd: string,
  email: string,
  şifre: string
): Promise<void> {
  const şifreHash = await şifreHashle(şifre)
  await db.insert(kişiler).values({
    öğrenciNo,
    ad,
    soyAd,
    email,
    şifreHash
  })
}

//# Kişi güncelle
export async function kişiGüncelle(
  id: number,
  {
    öğrenciNo,
    ad,
    soyAd,
    email,
    şifre
  }: {
    öğrenciNo?: number
    ad?: string
    soyAd?: string
    email?: string
    şifre?: string
  }
): Promise<void> {
  let şifreHash
  const res1 = await kişiOku(id, true)
  if (!res1) return
  if (şifre) {
    şifreHash = await şifreHashle(şifre)
  }
  const _öğrenciNo = öğrenciNo ?? res1.öğrenciNo
  const _ad = ad ?? res1.ad
  const _soyAd = soyAd ?? res1.soyAd
  const _email = email ?? res1.email
  const _şifreHash = şifreHash ?? (res1.şifreHash as string)
  await db
    .update(kişiler)
    .set({
      öğrenciNo: _öğrenciNo,
      ad: _ad,
      soyAd: _soyAd,
      email: _email,
      şifreHash: _şifreHash
    })
    .where(eq(kişiler.id, id))
}

//# Kişi sil
export async function kişiSil(id: number): Promise<void> {
  await db.delete(kişiler).where(eq(kişiler.id, id))
}

//info Proje işlemleri

//# Projeleri say
export async function projeleriSay(arama: string): Promise<number | void> {
  const res = await db
    .select({ count: count() })
    .from(projeler)
    .where(
      or(like(projeler.ad, `%${arama}%`), like(projeler.açıklama, `%${arama}%`))
    )
  return res[0]?.count
}

//# Projeleri oku
export async function projeleriOku(
  arama: string,
  sayfa: number,
  sayfaBoyutu: number
): Promise<SunucuKaynaklıProjeler | void> {
  const res = await db.query.projeler.findMany({
    where: or(
      like(projeler.ad, `%${arama}%`),
      like(projeler.açıklama, `%${arama}%`)
    ),
    limit: sayfaBoyutu,
    offset: (sayfa - 1) * sayfaBoyutu,
    with: {
      üyeler: {
        columns: {},
        with: {
          üye: {
            columns: {
              id: true
            }
          }
        }
      }
    }
  })
  const processedRes: SunucuKaynaklıProjeler = []
  for (const proje of res) {
    processedRes.push({
      id: proje.id,
      ad: proje.ad,
      başlangıçTarihi: proje.başlangıçTarihi,
      bitişTarihi: proje.bitişTarihi,
      açıklama: proje.açıklama,
      üyeler: proje.üyeler.map((kişiProje) => kişiProje.üye.id)
    })
  }
  return processedRes
}

//# Proje oku
export async function projeOku(
  id: number
): Promise<SunucuKaynaklıProje | void> {
  const res = await db.query.projeler.findFirst({
    where: eq(projeler.id, id),
    with: {
      üyeler: {
        columns: {},
        with: {
          üye: true
        }
      }
    }
  })
  if (!res) return
  const processedRes: SunucuKaynaklıProje = {
    id: res.id,
    ad: res.ad,
    başlangıçTarihi: res.başlangıçTarihi,
    bitişTarihi: res.bitişTarihi,
    açıklama: res.açıklama,
    üyeler: res.üyeler.map((kişiProje) => kişiProje.üye)
  }
  return processedRes
}

//# Proje yarat
export async function projeYarat(
  ad: string,
  başlangıçTarihi: string,
  bitişTarihi: string,
  açıklama: string,
  üyeler: number[]
): Promise<void> {
  await db.insert(projeler).values({
    ad,
    başlangıçTarihi,
    bitişTarihi,
    açıklama
  })
  const res = await db.select().from(projeler).where(eq(projeler.ad, ad))
  const projeId = res[0]!.id
  for (const üye of üyeler) {
    await db.insert(kişilerProjeler).values({
      kişi: üye,
      proje: projeId
    })
  }
}

//# Proje güncelle
export async function projeGüncelle(
  id: number,
  {
    ad,
    başlangıçtarihi,
    bitiştarihi,
    açıklama,
    üyeler
  }: {
    ad?: string
    başlangıçtarihi?: string
    bitiştarihi?: string
    açıklama?: string
    üyeler?: number[]
  },
  pool: Pool
): Promise<void> {
  const res1 = await projeOku(id, pool)
  if (!res1) return
  const _ad = ad ?? res1.ad
  const _başlangıçtarihi = başlangıçtarihi ?? res1.başlangıçtarihi
  const _bitiştarihi = bitiştarihi ?? res1.bitiştarihi
  const _açıklama = açıklama ?? res1.açıklama
  const _üyeler = üyeler ?? res1.üyeler
  const query = {
    text: 'UPDATE proje SET ad = $1, başlangıçtarihi = $2, bitiştarihi = $3, açıklama = $4, üyeler = $5 WHERE id = $6',
    values: [_ad, _başlangıçtarihi, _bitiştarihi, _açıklama, _üyeler, id]
  }
  await pool.query(query)
}

//# Proje sil
export async function projeSil(id: number, pool: Pool): Promise<void> {
  const query = {
    text: 'DELETE FROM proje WHERE id = $1',
    values: [id]
  }
  await pool.query(query)
}

//info Gereç işlemleri

//# Gereçleri say
export async function gereçleriSay(
  arama: string,
  pool: Pool
): Promise<number | void> {
  const res = await pool.query({
    text: `SELECT COUNT(*) FROM gereç WHERE ad LIKE '%${arama}%'`
  })
  return parseInt(res.rows[0].count)
}

//# Gereçleri oku
export async function gereçleriOku(
  arama: string,
  sayfa: number,
  sayfaBoyutu: number,
  pool: Pool
): Promise<Gereçler | void> {
  const res = await pool.query({
    text: `SELECT * FROM gereç WHERE ad LIKE '%${arama}%'  LIMIT ${sayfaBoyutu} OFFSET ${
      (sayfa - 1) * sayfaBoyutu
    }`
  })
  return res.rows as Gereçler
}

//# Gereç oku
export async function gereçOku(id: number, pool: Pool): Promise<Gereç | void> {
  const res = await pool.query({
    text: 'SELECT * FROM gereç WHERE id = $1',
    values: [id]
  })
  return res.rows[0] as Gereç
}

//# Gereç yarat
export async function gereçYarat(
  ad: string,
  adet: number,
  pool: Pool
): Promise<void> {
  const query = {
    text: 'INSERT INTO gereç(ad, adet) VALUES($1, $2)',
    values: [ad, adet]
  }
  await pool.query(query)
}

//# Gereç güncelle
export async function gereçGüncelle(
  id: number,
  { ad, adet }: { ad?: string; adet?: number },
  pool: Pool
): Promise<void> {
  const res1 = await gereçOku(id, pool)
  if (!res1) return
  const _ad = ad ?? res1.ad
  const _adet = adet ?? res1.adet
  const query = {
    text: 'UPDATE gereç SET ad = $1, adet = $2 WHERE id = $3',
    values: [_ad, _adet, id]
  }
  await pool.query(query)
}

//# Gereç sil
export async function gereçSil(id: number, pool: Pool): Promise<void> {
  const query = {
    text: 'DELETE FROM gereç WHERE id = $1',
    values: [id]
  }
  await pool.query(query)
}

//info Sarf işlemleri

//# Sarfları say
export async function sarflarıSay(
  arama: string,
  pool: Pool
): Promise<number | void> {
  const res = await pool.query({
    text: `SELECT COUNT(*) FROM sarf WHERE ad LIKE '%${arama}%' OR sicilno LIKE '%${arama}%'`
  })
  return parseInt(res.rows[0].count)
}

//# Sarfları oku
export async function sarflarıOku(
  arama: string,
  sayfa: number,
  sayfaBoyutu: number,
  pool: Pool
): Promise<Sarflar | void> {
  const res = await pool.query({
    text: `SELECT * FROM sarf WHERE ad LIKE '%${arama}%' OR sicilno LIKE '%${arama}%' LIMIT ${sayfaBoyutu} OFFSET ${
      (sayfa - 1) * sayfaBoyutu
    }`
  })
  return res.rows as Sarflar
}

//# Sarf oku
export async function sarfOku(id: number, pool: Pool): Promise<Sarf | void> {
  const res = await pool.query({
    text: 'SELECT * FROM sarf WHERE id = $1',
    values: [id]
  })
  return res.rows[0] as Sarf
}

//# Sarf yarat
export async function sarfYarat(
  ad: string,
  açıklama: string,
  arızalı: boolean,
  pool: Pool
): Promise<void> {
  const query = {
    text: 'INSERT INTO sarf(ad, açıklama, arızalı) VALUES($1, $2, $3)',
    values: [ad, açıklama, arızalı]
  }
  await pool.query(query)
}

//# Sarf güncelle
export async function sarfGüncelle(
  id: number,
  {
    ad,
    açıklama,
    arızalı
  }: { ad?: string; açıklama?: string; arızalı?: boolean },
  pool: Pool
): Promise<void> {
  const res1 = await sarfOku(id, pool)
  if (!res1) return
  const _ad = ad ?? res1.ad
  const _açıklama = açıklama ?? res1.açıklama
  const _arızalı = arızalı ?? res1.arızalı
  const query = {
    text: 'UPDATE sarf SET ad = $1, açıklama = $2, arızalı = $3 WHERE id = $4',
    values: [_ad, _açıklama, _arızalı, id]
  }
  await pool.query(query)
}

//# Sarf sil
export async function sarfSil(id: number, pool: Pool): Promise<void> {
  const query = {
    text: 'DELETE FROM sarf WHERE id = $1',
    values: [id]
  }
  await pool.query(query)
}

//info Randevu işlemleri

//# Randevuları say
export async function randevularıSay(
  pool: Pool,
  buTarihtenÖnce: string,
  buTarihtenSonra: string
): Promise<number | void> {
  const res = await pool.query({
    text: `SELECT COUNT(*) FROM randevu`
  })
  return parseInt(res.rows[0].count)
}

//# Randevuları oku
export async function randevularıOku(
  sayfa: number,
  sayfaBoyutu: number,
  pool: Pool,
  buTarihtenÖnce?: string,
  buTarihtenSonra?: string
): Promise<Randevular | void> {
  const res = await pool.query({
    text: `SELECT * FROM randevu ORDER BY gün DESC LIMIT ${sayfaBoyutu} OFFSET ${
      (sayfa - 1) * sayfaBoyutu
    }`
  })
  return res.rows as Randevular
}

//# Randevu oku
export async function randevuOku(
  id: number,
  pool: Pool
): Promise<Randevu | void> {
  const res = await pool.query({
    text: 'SELECT * FROM randevu WHERE id = $1',
    values: [id]
  })
  return res.rows[0] as Randevu
}

//# Randevu yarat
export async function randevuYarat(
  açıklama: string,
  proje: number,
  gereçler: [gereç: number, adet: number][],
  sarflar: string[],
  gün: string,
  başlangıçzamanı: string,
  bitişzamanı: string,
  pool: Pool
): Promise<void> {
  const query = {
    text: 'INSERT INTO randevu(açıklama, proje, gereçler, sarflar, gün, başlangıçzamanı, bitişzamanı) VALUES($1, $2, $3, $4, $5, $6, $7)',
    values: [
      açıklama,
      proje,
      gereçler,
      sarflar,
      gün,
      başlangıçzamanı,
      bitişzamanı
    ]
  }
  await pool.query(query)
}

//# Randevu güncelle
export async function randevuGüncelle(
  id: number,
  {
    açıklama,
    proje,
    gereçler,
    sarflar,
    gün,
    başlangıçzamanı,
    bitişzamanı
  }: {
    açıklama?: string
    proje?: number
    gereçler?: [gereç: number, adet: number][]
    sarflar?: string[]
    gün?: string
    başlangıçzamanı?: string
    bitişzamanı?: string
  },
  pool: Pool
): Promise<void> {
  const res1 = await randevuOku(id, pool)
  if (!res1) return
  const _açıklama = açıklama ?? res1.açıklama
  const _proje = proje ?? res1.proje
  const _gereçler = gereçler ?? res1.gereçler
  const _sarflar = sarflar ?? res1.sarflar
  const _gün = gün ?? res1.gün
  const _başlangıçzamanı = başlangıçzamanı ?? res1.başlangıçzamanı
  const _bitişzamanı = bitişzamanı ?? res1.bitişzamanı
  const query = {
    text: 'UPDATE randevu SET açıklama = $1 proje = $2, gereçler = $3, sarflar = $4, gün = $5, başlangıçzamanı = $6, bitişzamanı = $7 WHERE id = $8',
    values: [
      _açıklama,
      _proje,
      _gereçler,
      _sarflar,
      _gün,
      _başlangıçzamanı,
      _bitişzamanı,
      id
    ]
  }
  await pool.query(query)
}

//# Randevu sil
export async function randevuSil(id: number, pool: Pool): Promise<void> {
  const query = {
    text: 'DELETE FROM randevu WHERE id = $1',
    values: [id]
  }
  await pool.query(query)
}

//info Tatil işlemleri

//# Tatilleri say
export async function tatilleriSay(
  arama: string,
  pool: Pool
): Promise<number | void> {
  try {
    const res = await pool.query({
      text: `SELECT COUNT(*) FROM tatil WHERE açıklama LIKE '%${arama}%'`
    })
    return parseInt(res.rows[0].count)
  } catch (err) {
    console.error(err)
  }
}

//# Tatilleri oku
export async function tatilleriOku(
  arama: string,
  sayfa: number,
  sayfaBoyutu: number,
  pool: Pool
): Promise<Tatiller | void> {
  try {
    const res = await pool.query({
      text: `SELECT * FROM tatil WHERE açıklama LIKE '%${arama}%' LIMIT ${sayfaBoyutu} OFFSET ${
        (sayfa - 1) * sayfaBoyutu
      }`
    })
    return res.rows as Tatiller
  } catch (err) {
    console.error(err)
  }
}

//# Tatil yarat
export async function tatilYarat(
  açıklama: string,
  başlangıç: string,
  bitiş: string,
  pool: Pool
): Promise<void> {
  try {
    const query = {
      text: 'INSERT INTO tatil(açıklama, başlangıç, bitiş) VALUES($1, $2, $3)',
      values: [açıklama, başlangıç, bitiş]
    }
    await pool.query(query)
  } catch (err) {
    console.error(err)
  }
}

//# Tatil sil
export async function tatilSil(id: number, pool: Pool): Promise<void> {
  try {
    const query = {
      text: 'DELETE FROM tatil WHERE id = $1',
      values: [id]
    }
    await pool.query(query)
  } catch (err) {
    console.error(err)
  }
}

//# Tatil güncelle
export async function tatilGüncelle(
  id: number,
  {
    açıklama,
    başlangıç,
    bitiş
  }: { açıklama?: string; başlangıç?: string; bitiş?: string },
  pool: Pool
): Promise<void> {
  try {
    const res1 = await tatilOku(id, pool)
    if (!res1) return
    const _açıklama = açıklama ?? res1.açıklama
    const _başlangıç = başlangıç ?? res1.başlangıç
    const _bitiş = bitiş ?? res1.bitiş
    const query = {
      text: 'UPDATE tatil SET açıklama = $1, başlangıç = $2, bitiş = $3 WHERE id = $4',
      values: [_açıklama, _başlangıç, _bitiş, id]
    }
    await pool.query(query)
  } catch (err) {
    console.error(err)
  }
}

//# Tatil oku
export async function tatilOku(id: number, pool: Pool): Promise<Tatil | void> {
  try {
    const res = await pool.query({
      text: 'SELECT * FROM tatil WHERE id = $1',
      values: [id]
    })
    return res.rows[0] as Tatil
  } catch (err) {
    console.error(err)
  }
}

//info Ziyaret işlemleri

//# Ziyaretleri say
export async function ziyaretleriSay(
  arama: string,
  pool: Pool
): Promise<number | void> {
  try {
    const res = await pool.query({
      text: `SELECT COUNT(*) FROM ziyaret WHERE ziyareteden LIKE '%${arama}%'`
    })
    return parseInt(res.rows[0].count)
  } catch (err) {
    console.error(err)
  }
}

//# Ziyaretleri oku
export async function ziyaretleriOku(
  arama: string,
  sayfa: number,
  sayfaBoyutu: number,
  pool: Pool
): Promise<Ziyaretler | void> {
  try {
    const res = await pool.query({
      text: `SELECT * FROM ziyaret WHERE ziyareteden LIKE '%${arama}%' LIMIT ${sayfaBoyutu} OFFSET ${
        (sayfa - 1) * sayfaBoyutu
      }`
    })
    return res.rows as Ziyaretler
  } catch (err) {
    console.error(err)
  }
}

//# Ziyaret yarat
export async function ziyaretYarat(
  ziyareteden: string,
  ziyaretçisayısı: number,
  gün: string,
  başlangıçzamanı: string,
  bitişzamanı: string,
  pool: Pool
): Promise<void> {
  try {
    const query = {
      text: 'INSERT INTO ziyaret(ziyareteden, ziyaretçisayısı, gün, başlangıçzamanı, bitişzamanı) VALUES($1, $2, $3, $4, $5)',
      values: [ziyareteden, ziyaretçisayısı, gün, başlangıçzamanı, bitişzamanı]
    }
    await pool.query(query)
  } catch (err) {
    console.error(err)
  }
}

//# Ziyaret sil
export async function ziyaretSil(id: number, pool: Pool): Promise<void> {
  try {
    const query = {
      text: 'DELETE FROM ziyaret WHERE id = $1',
      values: [id]
    }
    await pool.query(query)
  } catch (err) {
    console.error(err)
  }
}

//# Ziyaret güncelle
export async function ziyaretGüncelle(
  id: number,
  {
    ziyareteden,
    ziyaretçisayısı,
    gün,
    başlangıçzamanı,
    bitişzamanı
  }: {
    ziyareteden?: string
    ziyaretçisayısı?: number
    gün?: string
    başlangıçzamanı?: string
    bitişzamanı?: string
  },
  pool: Pool
): Promise<void> {
  try {
    const res1 = await ziyaretOku(id, pool)
    if (!res1) return
    const _ziyareteden = ziyareteden ?? res1.ziyareteden
    const _ziyaretçisayısı = ziyaretçisayısı ?? res1.ziyaretçisayısı
    const _gün = gün ?? res1.gün
    const _başlangıçzamanı = başlangıçzamanı ?? res1.başlangıçzamanı
    const _bitişzamanı = bitişzamanı ?? res1.bitişzamanı
    const query = {
      text: 'UPDATE ziyaret SET ziyareteden = $1, ziyaretçisayısı = $2, gün = $3, başlangıçzamanı = $4, bitişzamanı = $5 WHERE id = $6',
      values: [
        _ziyareteden,
        _ziyaretçisayısı,
        _gün,
        _başlangıçzamanı,
        _bitişzamanı,
        id
      ]
    }
    await pool.query(query)
  } catch (err) {
    console.error(err)
  }
}

//# Ziyaret oku
export async function ziyaretOku(
  id: number,
  pool: Pool
): Promise<Ziyaret | void> {
  try {
    const res = await pool.query({
      text: 'SELECT * FROM ziyaret WHERE id = $1',
      values: [id]
    })
    return res.rows[0] as Ziyaret
  } catch (err) {
    console.error(err)
  }
}

//info Diğer işlemler

//# Şifre hashle
export async function şifreHashle(şifre: string): Promise<string> {
  const hash = await Bun.password.hash(şifre)
  return hash
}
