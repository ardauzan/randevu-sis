import { createContext } from 'react'
import type { Aksiyon } from '@/istemci/yönet/aksiyonlar'

export default createContext({
  durum: {} as Durum,
  aksiyonYayınla: (aksiyon: Aksiyon) => {}
})
