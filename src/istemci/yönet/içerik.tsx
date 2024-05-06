//info Yönetim panelinin gövdesi bu dosyada tanımlanır.
import React, { useContext } from 'react'
import PanelKontrolleriMobil from '@/istemci/yönet/panelKontrolleriMobil'
import VerileriListele from '@/istemci/yönet/verileriListele'
import Veriyiİncele from '@/istemci/yönet/veriyiİncele'
import Durum from '@/istemci/yönet/durum'
import Yükleniyor from '@/istemci/ortak/yükleniyor'

export default function İçerik() {
  const { durum } = useContext(Durum)
  return (
    <main className="flex h-screen w-screen flex-col items-center">
      <PanelKontrolleriMobil />
      {durum.yükleniyor && durum.veri === null ? (
        <Yükleniyor />
      ) : (
        <VerileriListele />
      )}
    </main>
  )
}
