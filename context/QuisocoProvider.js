import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";
import {useRouter} from 'next/router'

// Creamos el context de Quiosoco para poder consultar la API o la Base de datos
const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);

  const router = useRouter()

  const obtenerCategorias = async () => {
    const { data } = await axios("/api/categorias");
    setCategorias(data);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]); 

  useEffect(() => {
    const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0);
    setTotal(nuevoTotal);
  }, [pedido])
  

  const handleClickCategoria = (id) => {
    // Iteramos sobre las categorias para obtener la categoria seleccionada
    const categoria = categorias.filter((cat) => cat.id === id);
    setCategoriaActual(categoria[0]);
    router.push(`/`)
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  const handleSetModal = () => {
    setModal(!modal);
  };

  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      );
      setPedido(pedidoActualizado);
      toast.success("Guardado correctamente");
    } else {
      setPedido([...pedido, producto]);
      toast.success("Agregado al Pedido");
    }
    setModal(false);
  };

  const handleEditarCantidades = (id) => {
    const productoActualizado = pedido.filter((producto) => producto.id === id);
    setProducto(productoActualizado[0]);
    setModal(!modal);
  };
  const handleEliminarProducto = (id) => {
    const pedidoActualizado = pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActualizado);
  };
  const colocarOrden = async(e) => {
    e.preventDefault()
    try {
      await axios.post('/api/ordenes', {pedido, nombre, total, fecha : Date.now().toString()})
      toast.success("Orden enviada correctamente")

      // Resetear la app
      setCategoriaActual(categorias[0]);
      setPedido([])
      setNombre('')
      setTotal(0)

      setTimeout(() => {
        router.push('/')
      }, 3000);
    } catch (error) {
      
    }
  }; 

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        modal,
        handleSetModal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        colocarOrden,
        total
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
