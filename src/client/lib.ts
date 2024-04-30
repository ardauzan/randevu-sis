//# Verileri sorgula
export async function verileriSorgula(
  arama: string,
  sayfa: number,
  sayfaBoyutu: number,
  tablo: Tablo
): Promise<{
  total: number
  sayfa: number
  sayfaBoyutu: number
  içerik: Kişiler
} | void> {
  const response = await fetch(
    `/api/${tablo}?arama${
      arama !== '' ? '=' + arama : ''
    }&sayfa=${sayfa}&sayfaBoyutu=${sayfaBoyutu}`
  )

  const body = await response.json()
  return body
}

export const returnUndefinedIfEmptyString = (
  str: string
): string | undefined => (str === '' ? undefined : str)

export const parseArrayOfStringsToArrayOfNumbers = (str: string): number[] =>
  str.split(',').map((item) => parseInt(item))

export const getDateWithoutTime = (date: string): string =>
  date.split('T')[0] as string // YYYY-MM-DD

export const getTimeWithoutDate = (date: string): string =>
  (date.split('T')[1] as string).split('.')[0] as string // HH:MM:SS

export const getTimeWithoutSecondsAndDate = (date: string): string =>
  getTimeWithoutDate(date).split(':')[0] +
  ':' +
  getTimeWithoutDate(date).split(':')[1]

export const putComaInBetweenNumbersInAnArray = (
  arr: number[] | string[]
): string => arr.join(',')

export function normalizeTime(date: string): string {
  const _date = new Date(date)
  _date.setHours(_date.getHours() + 3)
  return _date?.toISOString()
}

export const parseGereçler = (gereçler: string): number[][] =>
  gereçler.split(',').map((e) => e.split(':').map((e) => parseInt(e)))

export const parseGereçlerToApiFormat = (gereçler: number[][]): string =>
  gereçler.map((e) => e.join(':')).join(',')

export const putColonInBetweenNumbersInAnArrayInAnArray = (
  arr: number[][]
): string => arr.map((e) => e.join(':')).join(',')

export const saniyeVeDakikayıAyır = (zaman: string): string[] =>
  zaman.split(':')

export function tariheSaniyeVeDakikaEkle(tarih: string, zaman: string): string {
  const _tarih = new Date(tarih)
  const [saat, dakika] = saniyeVeDakikayıAyır(zaman)
  _tarih.setHours(parseInt(saat as string))
  _tarih.setMinutes(parseInt(dakika as string))
  return normalizeTime(_tarih.toISOString())
}

export const tarihVeSaattenSaniyeyiAyır = (tarih: string): string =>
  getDateWithoutTime(tarih) +
  ' ' +
  getTimeWithoutDate(tarih).split(':').slice(0, 2).join(':')
