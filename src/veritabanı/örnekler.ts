import * as şema from '@/veritabanı/şema'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const havuz = new Pool()
const veritabanı = drizzle(havuz, {
  schema: şema
})

const {
  kişiler,
  projeler,
  kişilerProjeler,
  gereçler,
  araçlar,
  randevular,
  tatiller,
  ziyaretler
} = şema

const main = async () => {
  try {
    console.info('Veritabanı sıfırlanıyor ve örnek veri ekleniyor.')
    await veritabanı.delete(kişilerProjeler)
    await veritabanı.delete(kişiler)
    await veritabanı.delete(projeler)
    await veritabanı.delete(gereçler)
    await veritabanı.delete(araçlar)
    await veritabanı.delete(randevular)
    await veritabanı.delete(tatiller)
    await veritabanı.delete(ziyaretler)
    await veritabanı.insert(kişiler).values([
      {
        yönetici: true,
        öğrenciNo: 2311310817,
        ad: 'Ali Arda',
        soyAd: 'Uzan',
        email: 'arda.uzan@protonmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310818,
        ad: 'Veli',
        soyAd: 'Kaya',
        email: 'veli01@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310819,
        ad: 'Ayşe',
        soyAd: 'Yılmaz',
        email: 'ays99@hotmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310820,
        ad: 'Mehmet',
        soyAd: 'Koç',
        email: 'memo.fenerbahce2@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310821,
        ad: 'Fatma',
        soyAd: 'Kara',
        email: 'ftmkr22@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310822,
        ad: 'Aylin',
        soyAd: 'Koç',
        email: 'aylin.koc@yahoo.com.tr',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310823,
        ad: 'Merve',
        soyAd: 'Kara',
        email: 'mrveeee@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310824,
        ad: 'Kerem',
        soyAd: 'Aydın',
        email: 'kerem.aydın@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310825,
        ad: 'Ezgi',
        soyAd: 'Beyaz',
        email: 'ezgiben121@outlook.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310826,
        ad: 'Selin',
        soyAd: 'Muhtar',
        email: 'seln02@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310827,
        ad: 'Ege',
        soyAd: 'Olgun',
        email: 'egeyeni32@outlook.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310828,
        ad: 'Ela',
        soyAd: 'Güneş',
        email: 'ela.gunes@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310829,
        ad: 'Kerem',
        soyAd: 'Altın',
        email: 'keremaltınn@hotmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310830,
        ad: 'Ece',
        soyAd: 'Üstün',
        email: 'eceustn@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310831,
        ad: 'Mert',
        soyAd: 'Adıvar',
        email: 'mert1223223@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310832,
        ad: 'Efe',
        soyAd: 'Kapı',
        email: 'efe.kapı@outlook.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310833,
        ad: 'Kerem',
        soyAd: 'Kaplan',
        email: 'kaplankerem@proton.me',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: true,
        öğrenciNo: 2311310834,
        ad: 'Deniz',
        soyAd: 'Tonka',
        email: 'deniztonka@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310835,
        ad: 'Eren',
        soyAd: 'Kara',
        email: 'eren.kara@hotmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310836,
        ad: 'Merve',
        soyAd: 'Pınar',
        email: 'merve.pi64@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310837,
        ad: 'Ezgi',
        soyAd: 'Kara',
        email: 'ezgiii_@hotmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310838,
        ad: 'Kerim',
        soyAd: 'Aslan',
        email: 'aslankerim11@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310839,
        ad: 'Gizem',
        soyAd: 'Demir',
        email: 'gizem1234@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310840,
        ad: 'Burak',
        soyAd: 'Çelik',
        email: 'burakcelik@hotmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310841,
        ad: 'İrem',
        soyAd: 'Koçak',
        email: 'irem.kocak@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310842,
        ad: 'Buse',
        soyAd: 'Yıldırım',
        email: 'buse.yildirim@yahoo.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310843,
        ad: 'Berk',
        soyAd: 'Şahin',
        email: 'berk.sahin@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310844,
        ad: 'Zeynep',
        soyAd: 'Öztürk',
        email: 'zeynep_1999@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310845,
        ad: 'Emre',
        soyAd: 'Kurt',
        email: 'emrekurt123@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310846,
        ad: 'Aslı',
        soyAd: 'Görkem',
        email: 'asli.gorkem@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310847,
        ad: 'Ozan',
        soyAd: 'Demir',
        email: 'ozandemir@hotmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310848,
        ad: 'Sinem',
        soyAd: 'Yavuz',
        email: 'sinem.yavuz@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310849,
        ad: 'Onur',
        soyAd: 'Yıldız',
        email: 'onur.yildiz@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310850,
        ad: 'Bora',
        soyAd: 'Çelik',
        email: 'bora.celik@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310851,
        ad: 'Canan',
        soyAd: 'Şahin',
        email: 'canan.sahin@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310852,
        ad: 'Deniz',
        soyAd: 'Eren',
        email: 'deniz.eren@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310853,
        ad: 'Gökhan',
        soyAd: 'Ak',
        email: 'gokhan.ak@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310854,
        ad: 'Cansu',
        soyAd: 'Demir',
        email: 'cansu.demir@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310855,
        ad: 'Uğur',
        soyAd: 'Kaya',
        email: 'ugur.kaya@gmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310856,
        ad: 'Ece',
        soyAd: 'Kara',
        email: 'ecekara@hotmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310857,
        ad: 'Kerem',
        soyAd: 'Koç',
        email: 'keremkoc@hotmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      },
      {
        yönetici: false,
        öğrenciNo: 2311310858,
        ad: 'Merve',
        soyAd: 'Murat',
        email: 'mermur@outlook.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      }
    ])
    await veritabanı.insert(projeler).values([
      {
        ad: 'Proje 1',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 1 açıklama'
      },
      {
        ad: 'Proje 2',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 2 açıklama'
      },
      {
        ad: 'Proje 3',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 3 açıklama'
      },
      {
        ad: 'Proje 4',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 4 açıklama'
      },
      {
        ad: 'Proje 5',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 5 açıklama'
      },
      {
        ad: 'Proje 6',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 6 açıklama'
      },
      {
        ad: 'Proje 7',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 7 açıklama'
      },
      {
        ad: 'Proje 8',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 8 açıklama'
      },
      {
        ad: 'Proje 9',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 9 açıklama'
      },
      {
        ad: 'Proje 10',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 10 açıklama'
      },
      {
        ad: 'Proje 11',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 11 açıklama'
      },
      {
        ad: 'Proje 12',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 12 açıklama'
      },
      {
        ad: 'Proje 13',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 13 açıklama'
      },
      {
        ad: 'Proje 14',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 14 açıklama'
      },
      {
        ad: 'Proje 15',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 15 açıklama'
      },
      {
        ad: 'Proje 16',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 16 açıklama'
      },
      {
        ad: 'Proje 17',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 17 açıklama'
      },
      {
        ad: 'Proje 18',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 18 açıklama'
      },
      {
        ad: 'Proje 19',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 19 açıklama'
      },
      {
        ad: 'Proje 20',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 20 açıklama'
      },
      {
        ad: 'Proje 21',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 21 açıklama'
      },
      {
        ad: 'Proje 22',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 22 açıklama'
      },
      {
        ad: 'Proje 23',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 23 açıklama'
      },
      {
        ad: 'Proje 24',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 24 açıklama'
      },
      {
        ad: 'Proje 25',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 25 açıklama'
      },
      {
        ad: 'Proje 26',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 26 açıklama'
      },
      {
        ad: 'Proje 27',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 27 açıklama'
      },
      {
        ad: 'Proje 28',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 28 açıklama'
      },
      {
        ad: 'Proje 29',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 29 açıklama'
      },
      {
        ad: 'Proje 30',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 30 açıklama'
      },
      {
        ad: 'Proje 31',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 31 açıklama'
      },
      {
        ad: 'Proje 32',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 32 açıklama'
      },
      {
        ad: 'Proje 33',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 33 açıklama'
      },
      {
        ad: 'Proje 34',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 34 açıklama'
      },
      {
        ad: 'Proje 35',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 35 açıklama'
      },
      {
        ad: 'Proje 36',
        başlangıçTarihi: '2023-12-01',
        bitişTarihi: '2024-06-01',
        açıklama: 'Proje 36 açıklama'
      }
    ])
    await veritabanı.insert(kişilerProjeler).values([
      {
        üye: 1,
        proje: 1
      },
      {
        üye: 1,
        proje: 2
      },
      {
        üye: 1,
        proje: 3
      },
      {
        üye: 1,
        proje: 4
      },
      {
        üye: 1,
        proje: 5
      },
      {
        üye: 1,
        proje: 6
      },
      {
        üye: 1,
        proje: 7
      }
    ])
    console.info('Veritabanı sıfırlandı ve örnek veriler eklendi.')
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
