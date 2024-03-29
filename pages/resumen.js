import ResumenProducto from "../components/ResumenProducto";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";


export default function Resumen() {
  const { pedido } = useQuiosco();
  return (
    <Layout pagina="Resumen">
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="text-2xl my-10">Revisa tu pedido</p>
      {pedido.length === 0 ? (
        <p className="text-2xl text-center my-10">No hay productos en tu pedido</p> 
      ): pedido.map(producto =>(<ResumenProducto key={producto.id} producto={producto}/>)

      )}
    </Layout>
  );
}
