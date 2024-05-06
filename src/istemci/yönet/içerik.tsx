//info Yönetim panelinin gövdesi bu dosyada tanımlanır.
import React, { useContext } from 'react'
import PanelKontrolleriMobil from '@/istemci/yönet/panelKontrolleriMobil'
import PanelKontrolleri from '@/istemci/yönet/panelKontrolleri'
import VerileriListele from '@/istemci/yönet/verileriListele'
import Veriyiİncele from '@/istemci/yönet/veriyiİncele'
import Durum from '@/istemci/yönet/durum'

export default function İçerik() {
  const { durum } = useContext(Durum)
  return (
    <main className="flex h-screen w-screen flex-col items-center">
      <PanelKontrolleriMobil />
      <section className="flex h-full w-full">
        <PanelKontrolleri />
        {durum.amaç === 'listele' ? <VerileriListele /> : <Veriyiİncele />}
      </section>
    </main>
  )
}
