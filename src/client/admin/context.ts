import { createContext } from 'react'

const AdminContext = createContext({
  arama: '',
  setArama: (arama: string) => {},
  sayfa: 1,
  setSayfa: (sayfa: number) => {},
  sayfaBoyutu: 10,
  setSayfaBoyutu: (sayfaBoyutu: number) => {},
  tablo: 'kisi' as Tablo,
  setTablo: (tablo: Tablo) => {}
})
export default AdminContext
