//info Burda uygulamayı çalıştıran sunucu tarafı mantığı tanımlıyoruz.
import type { Pool } from 'pg'

//info Kişi işlemleri

//# Kişileri say
export async function kişileriSay(
  arama: string,
  pool: Pool
): Promise<number | void> {
  const res = await pool.query({
    text: `SELECT COUNT(*) FROM kişi WHERE ad LIKE '%${arama}%' OR soyad LIKE '%${arama}%' OR email LIKE '%${arama}%'`
  })
  return parseInt(res.rows[0].count)
}

//# Kişileri oku
export async function kişileriOku(
  arama: string,
  sayfa: number,
  sayfaBoyutu: number,
  pool: Pool
): Promise<Kişiler | void> {
  const res = await pool.query({
    text: `SELECT id, öğrencino, ad, soyad, email FROM kişi WHERE ad LIKE '%${arama}%' OR soyad LIKE '%${arama}%'  OR email LIKE '%${arama}%' LIMIT ${sayfaBoyutu} OFFSET ${
      (sayfa - 1) * sayfaBoyutu
    }`
  })
  return res.rows as Kişiler
}

//# Kişi oku
export async function kişiOku(
  id: number,
  pool: Pool,
  showPasswordHash: boolean = false
): Promise<Kişi | void> {
  const res = await pool.query({
    text: `SELECT id, öğrencino, ad, soyad${showPasswordHash ? ', şifrehash' : ''}, email FROM kişi WHERE id = $1`,
    values: [id]
  })
  return res.rows[0] as Kişi
}

//# Kişi yarat
export async function kişiYarat(
  öğrencino: number,
  ad: string,
  soyad: string,
  email: string,
  şifre: string,
  pool: Pool
): Promise<void> {
  const şifrehash = await şifreHashle(şifre)
  const query = {
    text: 'INSERT INTO kişi(öğrencino, ad, soyad, email, şifrehash) VALUES($1, $2, $3, $4, $5)',
    values: [öğrencino, ad, soyad, email, şifrehash]
  }
  await pool.query(query)
}

//# Kişi güncelle
export async function kişiGüncelle(
  id: number,
  {
    öğrencino,
    ad,
    soyad,
    email,
    şifre
  }: {
    öğrencino?: number
    ad?: string
    soyad?: string
    email?: string
    şifre?: string
  },
  pool: Pool
): Promise<void> {
  let şifreHash
  const res1 = await kişiOku(id, pool, true)
  if (!res1) return
  if (şifre) {
    şifreHash = await şifreHashle(şifre)
  }
  const _öğrencino = öğrencino ?? res1.öğrencino
  const _ad = ad ?? res1.ad
  const _soyad = soyad ?? res1.soyad
  const _email = email ?? res1.email
  const _şifrehash = şifreHash ?? res1.şifrehash
  const query = {
    text: 'UPDATE kişi SET öğrencino = $1, ad = $2, soyad = $3, email = $4, şifrehash = $5 WHERE id = $6',
    values: [_öğrencino, _ad, _soyad, _email, _şifrehash, id]
  }
  await pool.query(query)
}

//# Kişi sil
export async function kişiSil(id: number, pool: Pool): Promise<void> {
  const query = {
    text: 'DELETE FROM kişi WHERE id = $1',
    values: [id]
  }
  await pool.query(query)
}

//info Proje işlemleri

//# Projeleri say
export async function projeleriSay(
  arama: string,
  pool: Pool
): Promise<number | void> {
  const res = await pool.query({
    text: `SELECT COUNT(*) FROM proje WHERE ad LIKE '%${arama}%' OR açıklama LIKE '%${arama}%'`
  })
  return parseInt(res.rows[0].count)
}

//# Projeleri oku
export async function projeleriOku(
  arama: string,
  sayfa: number,
  sayfaBoyutu: number,
  pool: Pool
): Promise<Projeler | void> {
  const res = await pool.query({
    text: `SELECT * FROM proje WHERE ad LIKE '%${arama}%' OR açıklama LIKE '%${arama}%' LIMIT ${sayfaBoyutu} OFFSET ${
      (sayfa - 1) * sayfaBoyutu
    }`
  })
  return res.rows as Projeler
}

//# Proje oku
export async function projeOku(id: number, pool: Pool): Promise<Proje | void> {
  const res = await pool.query({
    text: 'SELECT * FROM proje WHERE id = $1',
    values: [id]
  })
  return res.rows[0] as Proje
}

//# Proje yarat
export async function projeYarat(
  ad: string,
  başlangıçtarihi: string,
  bitiştarihi: string,
  açıklama: string,
  üyeler: number[],
  pool: Pool
): Promise<void> {
  const query = {
    text: 'INSERT INTO proje(ad, başlangıçtarihi, bitiştarihi, açıklama, üyeler) VALUES($1, $2, $3, $4, $5)',
    values: [ad, başlangıçtarihi, bitiştarihi, açıklama, üyeler]
  }
  await pool.query(query)
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
