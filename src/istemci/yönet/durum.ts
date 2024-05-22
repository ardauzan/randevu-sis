import { createContext } from 'react'

export default createContext({
  durum: {} as Durum,
  aksiyonYayınla: (_aksiyon: Aksiyon) => {}
})
