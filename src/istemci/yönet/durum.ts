import { createContext } from 'react'

export default createContext({
  durum: {} as Durum,
  aksiyonYayınla: (aksiyon: Aksiyon) => {}
})
