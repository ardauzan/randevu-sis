import { useMemo } from 'react'

export interface useSayfalamaProps {
  readonly toplam: number
  readonly sayfaBoyutu: number
  readonly kardeşSayısı?: number
  readonly mevcutSayfa: number
}

export default function useSayfalama({
  toplam,
  sayfaBoyutu,
  kardeşSayısı = 1,
  mevcutSayfa
}: useSayfalamaProps) {
  const menzil = (başlangıç: number, bitiş: number) => {
    const uzunluk = bitiş - başlangıç + 1
    return Array.from({ length: uzunluk }, (_, index) => index + başlangıç)
  }
  const sayfalamaMenzili = useMemo(() => {
    const noktalar = '...'
    const toplamSayfaSayısı = Math.ceil(toplam / sayfaBoyutu)
    const toplamSayfaNumaraları = kardeşSayısı + 5
    if (toplamSayfaNumaraları >= toplamSayfaSayısı) {
      return menzil(1, toplamSayfaSayısı)
    }
    const solKardeşKonum = Math.max(mevcutSayfa - kardeşSayısı, 1)
    const sağKardeşKonum = Math.min(
      mevcutSayfa + kardeşSayısı,
      toplamSayfaSayısı
    )
    const soldaNoktalarıGöstermeli = solKardeşKonum > 2
    const sağdaNoktalarıGöstermeli = sağKardeşKonum < toplamSayfaSayısı - 2
    const ilkSayfaKonum = 1
    const sonSayfaKonum = toplamSayfaSayısı
    if (!soldaNoktalarıGöstermeli && sağdaNoktalarıGöstermeli) {
      let soldakiElemanSayısı = 3 + 2 * kardeşSayısı
      let solMenzil = menzil(1, soldakiElemanSayısı)

      return [...solMenzil, noktalar, toplamSayfaSayısı]
    } else if (soldaNoktalarıGöstermeli && !sağdaNoktalarıGöstermeli) {
      let sağdakiElemanSayısı = 3 + 2 * kardeşSayısı
      let sağMenzil = menzil(
        toplamSayfaSayısı - sağdakiElemanSayısı + 1,
        toplamSayfaSayısı
      )
      return [ilkSayfaKonum, noktalar, ...sağMenzil]
    } else if (soldaNoktalarıGöstermeli && sağdaNoktalarıGöstermeli) {
      let ortaMenzil = menzil(solKardeşKonum, sağKardeşKonum)
      return [ilkSayfaKonum, noktalar, ...ortaMenzil, noktalar, sonSayfaKonum]
    }
  }, [toplam, sayfaBoyutu, kardeşSayısı, mevcutSayfa])

  return sayfalamaMenzili
}
