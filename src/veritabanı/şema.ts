import { relations } from 'drizzle-orm'
import {
  serial,
  bigint,
  text,
  date,
  integer,
  boolean,
  time,
  primaryKey,
  pgTable
} from 'drizzle-orm/pg-core'

export const kişiler = pgTable('kişiler', {
  id: serial('id').primaryKey(),
  yönetici: boolean('yönetici').notNull().default(false),
  öğrenciNo: bigint('öğrenci_no', { mode: 'number' }).unique().notNull(),
  ad: text('ad').notNull(),
  soyAd: text('soy_ad').notNull(),
  email: text('email').unique().notNull(),
  şifreHash: text('şifre_hash').notNull()
})
export const projeler = pgTable('projeler', {
  id: serial('id').primaryKey(),
  ad: text('ad').unique().notNull(),
  başlangıçTarihi: date('başlangıç_tarihi').notNull(),
  bitişTarihi: date('bitiş_tarihi').notNull(),
  açıklama: text('açıklama').notNull()
})
export const kişilerProjeler = pgTable(
  'kişiler_projeler',
  {
    üye: integer('kişi')
      .references(() => kişiler.id)
      .notNull(),
    proje: integer('proje')
      .references(() => projeler.id)
      .notNull()
  },
  (t) => ({
    pk: primaryKey({ columns: [t.üye, t.proje] })
  })
)
export const gereçler = pgTable('gereçler', {
  id: serial('id').primaryKey(),
  ad: text('ad').notNull(),
  adet: integer('miktar').notNull()
})
export const araçlar = pgTable('araçlar', {
  id: serial('id').primaryKey(),
  ad: text('ad').notNull(),
  açıklama: text('açıklama').notNull(),
  arızalı: boolean('arızalı').notNull()
})
export const randevular = pgTable('randevular', {
  id: serial('id').primaryKey(),
  açıklama: text('açıklama').notNull(),
  proje: integer('proje_id')
    .references(() => projeler.id)
    .notNull(),
  gün: date('gün').notNull(),
  başlangıçZamanı: time('başlangıç_saat').notNull(),
  bitişZamanı: time('bitiş_saat').notNull()
})
export const gereçlerRandevular = pgTable(
  'gereçler_randevular',
  {
    randevu: integer('randevu')
      .references(() => randevular.id)
      .notNull(),
    gereç: integer('gereç')
      .references(() => gereçler.id)
      .notNull(),
    adet: integer('adet').notNull()
  },
  (t) => ({
    pk: primaryKey({ columns: [t.randevu, t.gereç] })
  })
)
export const araçlarRandevular = pgTable(
  'araçlar_randevular',
  {
    araç: integer('araç')
      .references(() => araçlar.id)
      .notNull(),
    randevu: integer('randevu')
      .references(() => randevular.id)
      .notNull()
  },
  (t) => ({
    pk: primaryKey({ columns: [t.araç, t.randevu] })
  })
)
export const tatiller = pgTable('tatiller', {
  id: serial('id').primaryKey(),
  başlangıçTarihi: date('başlangıç_tarihi').notNull(),
  bitişTarihi: date('bitiş_tarihi').notNull(),
  açıklama: text('açıklama').notNull()
})
export const ziyaretler = pgTable('ziyaretler', {
  id: serial('id').primaryKey(),
  gün: date('gün').notNull(),
  başlangıçZamanı: time('başlangıç_saat').notNull(),
  bitişZamanı: time('bitiş_saat').notNull(),
  ziyaretEden: text('ziyaret_eden').notNull(),
  ziyaretçiSayısı: integer('ziyaretçi_sayısı').notNull()
})

export const kişilerRelations = relations(kişiler, ({ many }) => ({
  projeler: many(kişilerProjeler)
}))
export const projelerRelations = relations(projeler, ({ many }) => ({
  üyeler: many(kişilerProjeler)
}))
export const kişilerProjelerRelations = relations(
  kişilerProjeler,
  ({ one }) => ({
    üye: one(kişiler, {
      fields: [kişilerProjeler.üye],
      references: [kişiler.id]
    }),
    proje: one(projeler, {
      fields: [kişilerProjeler.proje],
      references: [projeler.id]
    })
  })
)
export const randevularRelations = relations(randevular, ({ one, many }) => ({
  proje: one(projeler, {
    fields: [randevular.proje],
    references: [projeler.id]
  }),
  gereçler: many(gereçlerRandevular),
  araçlar: many(araçlarRandevular)
}))
