import {useContext} from 'react'
import QuioscoContext from '../context/QuisocoProvider'

const useQuiosco = () =>{
  return useContext(QuioscoContext)
}

export default useQuiosco