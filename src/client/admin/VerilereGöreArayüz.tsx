import React, { useState } from 'react'
import {
  getDateWithoutTime,
  normalizeTime,
  putComaInBetweenNumbersInAnArray,
  parseGereçlerToApiFormat,
  getTimeWithoutSecondsAndDate
} from '~/client/lib'

interface VerilereGöreArayüzProps {
  tablo: Tablo
  seçilenVeri: Veri | undefined
  amaç: Amaç
}

export default function VerilereGöreArayüz({
  tablo,
  seçilenVeri,
  amaç
}: VerilereGöreArayüzProps) {
  const [öğrencino, setÖğrencino] = useState(
    (seçilenVeri as Kişi)?.öğrencino || 0
  )
  const [ad, setAd] = useState(
    (seçilenVeri as Kişi | Proje | Gereç | Sarf)?.ad || ''
  )
  const [soyad, setSoyad] = useState((seçilenVeri as Kişi)?.soyad || '')
  const [email, setEmail] = useState((seçilenVeri as Kişi)?.email || '')
  const [şifre, setŞifre] = useState('')
  const [açıklama, setAçıklama] = useState(
    (seçilenVeri as Proje | Tatil)?.açıklama || ''
  )
  const [sorumlu, setSorumlu] = useState((seçilenVeri as Proje)?.sorumlu || 0)
  const [üyeler, setÜyeler] = useState<number[] | string>(
    (seçilenVeri as Proje)?.üyeler || ''
  )
  const [adet, setAdet] = useState((seçilenVeri as Gereç)?.adet || 0)
  const [sicilno, setSicilno] = useState((seçilenVeri as Sarf)?.sicilno || '')
  const [arızalı, setArızalı] = useState(
    (seçilenVeri as Sarf)?.arızalı || false
  )
  const [proje, setProje] = useState((seçilenVeri as Randevu)?.proje || 0)
  const [gereçler, setGereçler] = useState(
    parseGereçlerToApiFormat((seçilenVeri as Randevu)?.gereçler || [])
  )
  const [sarflar, setSarflar] = useState(
    putComaInBetweenNumbersInAnArray((seçilenVeri as Randevu)?.sarflar || [])
  )
  const [ziyareteden, setZiyareteden] = useState(
    (seçilenVeri as Ziyaret)?.ziyareteden || ''
  )
  const [ziyaretçisayısı, setZiyaretçisayısı] = useState(
    (seçilenVeri as Ziyaret)?.ziyaretçisayısı || 0
  )
  const [başlangıç, setBaşlangıç] = useState(
    getDateWithoutTime(
      normalizeTime(
        ((seçilenVeri as Proje | Tatil)?.başlangıç as string) ||
          normalizeTime(new Date().toISOString())
      )
    )
  )
  const [bitiş, setBitiş] = useState(
    getDateWithoutTime(
      normalizeTime(
        ((seçilenVeri as Proje | Tatil)?.bitiş as string) ||
          normalizeTime(new Date().toISOString())
      )
    )
  )
  const [gün, setGün] = useState(
    getDateWithoutTime(
      normalizeTime(
        ((seçilenVeri as Randevu | Ziyaret)?.gün as string) ||
          new Date().toISOString()
      )
    )
  )
  const [başlangıçZamanı, setBaşlangıçZamanı] = useState(
    ((seçilenVeri as Randevu | Ziyaret)?.başlangıçzamanı as string) ||
      getTimeWithoutSecondsAndDate(normalizeTime(new Date().toISOString()))
  )
  const [bitişZamanı, setBitişZamanı] = useState(
    ((seçilenVeri as Randevu | Ziyaret)?.bitişzamanı as string) ||
      getTimeWithoutSecondsAndDate(normalizeTime(new Date().toISOString()))
  )
  return (
    <>
      {(() =>
        tablo === 'kisi' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="öğrencino">Öğrenci No</label>
            <input
              name="öğrencino"
              id="öğrencino"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={öğrencino}
              onChange={(e) => {
                setÖğrencino(parseInt(e.target.value))
              }}
              type="number"
              required={amaç === 'ekle'}
              min={1}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'kisi' ||
        tablo === 'proje' ||
        tablo === 'gerec' ||
        tablo === 'sarf' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="ad">Ad</label>
            <input
              name="ad"
              id="ad"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={ad}
              onChange={(e) => {
                setAd(e.target.value)
              }}
              type="text"
              required={amaç === 'ekle'}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'kisi' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="soyad">Soyad</label>
            <input
              name="soyad"
              id="soyad"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={soyad}
              onChange={(e) => {
                setSoyad(e.target.value)
              }}
              type="text"
              required={amaç === 'ekle'}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'kisi' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              type="email"
              required={amaç === 'ekle'}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'kisi' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="şifre">Şifre</label>
            <input
              name="şifre"
              id="şifre"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={şifre}
              onChange={(e) => {
                setŞifre(e.target.value)
              }}
              type="password"
              required={amaç === 'ekle'}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'proje' || tablo === 'tatil' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="açıklama">Açıklama</label>
            <input
              name="açıklama"
              id="açıklama"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={açıklama}
              onChange={(e) => {
                setAçıklama(e.target.value)
              }}
              type="text"
              required={amaç === 'ekle'}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'proje' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="sorumlu">Sorumlu</label>
            <input
              name="sorumlu"
              id="sorumlu"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={sorumlu}
              onChange={(e) => {
                setSorumlu(parseInt(e.target.value))
              }}
              type="number"
              required={amaç === 'ekle'}
              min={1}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'proje' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="üyeler">Üyeler</label>
            <input
              name="üyeler"
              id="üyeler"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={üyeler as string}
              onChange={(e) => {
                setÜyeler(e.target.value)
              }}
              type="text"
              required={amaç === 'ekle'}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'gerec' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="adet">Adet</label>
            <input
              name="adet"
              id="adet"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={adet}
              onChange={(e) => {
                setAdet(parseInt(e.target.value))
              }}
              type="number"
              required={amaç === 'ekle'}
              min={1}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'sarf' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="sicilno">Sicil no</label>
            <input
              name="sicilno"
              id="sicilno"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={sicilno}
              onChange={(e) => {
                setSicilno(e.target.value)
              }}
              type="text"
              required={amaç === 'ekle'}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'sarf' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="arızalı">Arızalı</label>
            <input
              name="arızalı"
              id="arızalı"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              checked={arızalı}
              onChange={(e) => {
                setArızalı(e.target.checked)
              }}
              type="checkbox"
              required={amaç === 'ekle'}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'randevu' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="proje">Proje</label>
            <input
              name="proje"
              id="proje"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={proje}
              onChange={(e) => {
                setProje(parseInt(e.target.value))
              }}
              type="number"
              required={amaç === 'ekle'}
              min={1}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'randevu' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="gereçler">Gereçler</label>
            <input
              name="gereçler"
              id="gereçler"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={gereçler}
              onChange={(e) => {
                setGereçler(e.target.value)
              }}
              type="text"
              required={amaç === 'ekle'}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'randevu' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="sarflar">Sarflar</label>
            <input
              name="sarflar"
              id="sarflar"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={sarflar}
              onChange={(e) => {
                setSarflar(e.target.value)
              }}
              type="text"
              required={amaç === 'ekle'}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'ziyaret' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="ziyareteden">Ziyaret eden</label>
            <input
              name="ziyareteden"
              id="ziyareteden"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={ziyareteden}
              onChange={(e) => {
                setZiyareteden(e.target.value)
              }}
              type="text"
              required={amaç === 'ekle'}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'ziyaret' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="ziyaretçisayısı">Ziyaretçi sayısı</label>
            <input
              name="ziyaretçisayısı"
              id="ziyaretçisayısı"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={ziyaretçisayısı}
              onChange={(e) => {
                setZiyaretçisayısı(parseInt(e.target.value))
              }}
              type="number"
              required={amaç === 'ekle'}
              min={1}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'proje' || tablo === 'tatil' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="başlangıç">Başlangıç</label>
            <input
              name="başlangıç"
              id="başlangıç"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={başlangıç}
              onChange={(e) => {
                setBaşlangıç(e.target.value)
              }}
              type="date"
              required={amaç === 'ekle'}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'proje' || tablo === 'tatil' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="bitiş">Bitiş</label>
            <input
              name="bitiş"
              id="bitiş"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={bitiş}
              onChange={(e) => {
                setBitiş(e.target.value)
              }}
              type="date"
              required={amaç === 'ekle'}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'randevu' || tablo === 'ziyaret' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="gün">Gün</label>
            <input
              name="gün"
              id="gün"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={gün}
              onChange={(e) => {
                setGün(e.target.value)
              }}
              type="date"
              required={amaç === 'ekle'}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'randevu' || tablo === 'ziyaret' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="başlangıçzamanı">Başlangıç zamanı</label>
            <input
              name="başlangıçzamanı"
              id="başlangıçzamanı"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={başlangıçZamanı}
              onChange={(e) => {
                setBaşlangıçZamanı(e.target.value)
              }}
              type="time"
              required={amaç === 'ekle'}
            />
          </section>
        ) : null)()}
      {(() =>
        tablo === 'randevu' || tablo === 'ziyaret' ? (
          <section className="w-full sm:max-w-xs">
            <label htmlFor="bitişzamanı">Bitiş zamanı</label>
            <input
              name="bitişzamanı"
              id="bitişzamanı"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={bitişZamanı}
              onChange={(e) => {
                setBitişZamanı(e.target.value)
              }}
              type="time"
              required={amaç === 'ekle'}
              min={başlangıçZamanı}
            />
          </section>
        ) : null)()}
    </>
  )
}
