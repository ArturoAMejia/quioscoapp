import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'
import Categoria from './Categoria'

const Sidebar = () => {

  const { categorias } = useQuiosco()
  return (
    <>
      <Image width={300} height={100} src="/assets/img/logo.svg" alt='imagen-logotipo' />
      <nav className='mt-10'>
        {/* Itera en categorias para mostrar todas las categorias que existen */}
        {categorias.map(categoria => (
          // Se le pasa el id como key para cada categoria y el prop al componente
          <Categoria key={categoria.id} categoria={categoria}/>
        ))}
      </nav>
      
    </>
  )
}

export default Sidebar