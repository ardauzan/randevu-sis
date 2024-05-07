import React from 'react'
import PanelKontrolleriTabloSeçimAltPaneli from '@/istemci/yönet/panelKontrolleriTabloSeçimAltPaneli'
import PanelKontrolleriSorguAltPaneli from '@/istemci/yönet/panelKontrolleriSorguAltPaneli'

export default function PanelKontrolleriMobil() {
  return (
    <article className="hidden h-full flex-col items-center overflow-visible rounded-lg bg-gray-300 p-6 pt-8 sm:flex">
      <h2 className="text-center font-mono text-2xl font-semibold tracking-tight">
        Kontrol paneli
      </h2>
      <PanelKontrolleriTabloSeçimAltPaneli />
      <PanelKontrolleriSorguAltPaneli />
    </article>
  )
}
