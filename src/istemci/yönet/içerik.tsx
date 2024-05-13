import React, { useContext } from 'react'
import PanelKontrolleriMobil from '@/istemci/yönet/panelKontrolleriMobil'
import PanelKontrolleri from '@/istemci/yönet/panelKontrolleri'
import VerileriListele from '@/istemci/yönet/verileriListele'
import Veriyiİncele from '@/istemci/yönet/veriyiİncele'
import Durum from '@/istemci/yönet/durum'

export default function İçerik() {
  const { durum } = useContext(Durum)
  return (
    <main className="flex h-screen w-screen flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14">
      <PanelKontrolleriMobil />
      <section className="flex h-full w-full">
        <PanelKontrolleri />
        {(() => {
          switch (durum.amaç) {
            case 'listele':
              return <VerileriListele />
            case 'oku':
              return <Veriyiİncele />
            default:
              return <div>İçerik yok</div>
          }
        })()}
      </section>
    </main>
  )
}
