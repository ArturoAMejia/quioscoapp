import React from "react";
import Image from "next/image";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

const Producto = ({ producto }) => {
  const { handleSetProducto, modal, handleSetModal } = useQuiosco();
  const { nombre, precio, imagen } = producto;
  return (
    <div className="border p-3">
      <Image
        height={600}
        width={500}
        src={`/assets/img/${imagen}.jpg`}
        alt={`Imagen Platillo ${imagen}`}
      />
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-2">{nombre}</h2>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatearDinero(precio)}
        </p>
      </div>

      <button
        type="button"
        className="bg-indigo-600 text-white hover:bg-indigo-800 rounded w-full mt-5 p-3 font-bold"
        onClick={() => {
          handleSetProducto(producto)
          handleSetModal(true)}}
      >
        Agregar
      </button>
    </div>
  );
};

export default Producto;
