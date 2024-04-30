type Amaç = 'ekle' | 'güncelle' | 'sil'

type Tablo =
  | 'kisi'
  | 'proje'
  | 'gerec'
  | 'sarf'
  | 'randevu'
  | 'tatil'
  | 'ziyaret'

type Veri = Kişi | Proje | Gereç | Sarf | Randevu | Tatil | Ziyaret

type Veriler =
  | Kişiler
  | Projeler
  | Gereçler
  | Sarflar
  | Randevular
  | Tatiller
  | Ziyaretler
