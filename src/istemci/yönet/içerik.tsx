import React, { useContext, useState, useEffect } from 'react'
import PanelKontrolleriMobil from '@/istemci/yönet/panelKontrolleriMobil'
import PanelKontrolleri from '@/istemci/yönet/panelKontrolleri'
import VerileriListele from '@/istemci/yönet/verileriListele'
import Veriyiİncele from '@/istemci/yönet/veriyiİncele'
import VeriEkle from '@/istemci/yönet/veriEkle'
import GeriBildirim from '@/istemci/ortak/geriBildirim'
import Durum from '@/istemci/yönet/durum'

export default function İçerik() {
  const {
    durum: { amaç, hata }
  } = useContext(Durum)
  const [hataGeriBildiriminiGöster, setHataGeriBildiriminiGöster] =
    useState(false)

  useEffect(() => {
    if (hata !== '') setHataGeriBildiriminiGöster(true)
    else setHataGeriBildiriminiGöster(false)
  }, [hata])

  return (
    <main className="flex h-max min-h-screen w-screen flex-col items-center p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
      <PanelKontrolleriMobil />
      <section className="flex w-full">
        <PanelKontrolleri />
        {(() => {
          switch (amaç) {
            case 'listele':
              return <VerileriListele />
            case 'oku':
              return <Veriyiİncele />
            case 'ekle':
              return <VeriEkle />
            default:
              return <div>İçerik yok</div>
          }
        })()}
      </section>
      <GeriBildirim
        mesaj={hata}
        tip="başarısız"
        göster={hataGeriBildiriminiGöster}
        mesajıKapat={() => setHataGeriBildiriminiGöster(false)}
      />
    </main>
  )
}
