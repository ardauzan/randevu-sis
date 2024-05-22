import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as şema from '@/veritabanı/şema'

import örnekKişiler from '@/veritabanı/örnekKişiler.json'
import örnekProjeler from '@/veritabanı/örnekProjeler.json'
import örnekKişilerProjeler from '@/veritabanı/örnekKişilerProjeler.json'
import örnekGereçler from '@/veritabanı/örnekGereçler.json'
import örnekAraçlar from '@/veritabanı/örnekAraçlar.json'
import örnekRandevular from '@/veritabanı/örnekRandevular.json'
import örnekGereçlerRandevular from '@/veritabanı/örnekGereçlerRandevular.json'
import örnekAraçlarRandevular from '@/veritabanı/örnekAraçlarRandevular.json'
import örnekTatiller from '@/veritabanı/örnekTatiller.json'
import örnekZiyaretler from '@/veritabanı/örnekZiyaretler.json'

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
  gereçlerRandevular,
  araçlarRandevular,
  tatiller,
  ziyaretler
} = şema

const main = async () => {
  try {
    console.info('Veritabanı sıfırlanıyor ve örnek veri ekleniyor.')

    await veritabanı.delete(kişilerProjeler)
    await veritabanı.delete(kişiler)
    await veritabanı.delete(projeler)
    await veritabanı.delete(gereçlerRandevular)
    await veritabanı.delete(araçlarRandevular)
    await veritabanı.delete(gereçler)
    await veritabanı.delete(araçlar)
    await veritabanı.delete(randevular)
    await veritabanı.delete(tatiller)
    await veritabanı.delete(ziyaretler)

    await veritabanı.insert(kişiler).values(örnekKişiler)
    await veritabanı.insert(projeler).values(örnekProjeler)

    console.info('Veritabanı sıfırlandı ve örnek veriler eklendi.')
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
