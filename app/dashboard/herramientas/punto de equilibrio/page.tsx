"use client";

import { useState } from "react";

export default function PuntoEquilibrioPage() {
  const [precioVenta, setPrecioVenta] = useState("");
  const [costoVariable, setCostoVariable] = useState("");
  const [costosFijos, setCostosFijos] = useState("");

  const precio = Number(precioVenta);
  const costo = Number(costoVariable);
  const fijo = Number(costosFijos);

  const margenContribucion = precio - costo;

  const puntoUnidades =
    margenContribucion > 0 ? fijo / margenContribucion : 0;

  const puntoVentas = puntoUnidades * precio;

  const limpiar = () => {
    setPrecioVenta("");
    setCostoVariable("");
    setCostosFijos("");
  };

  return (
    <div className="min-h-screen bg-[#F8F4FF] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-black text-[#1D1B3A]">
            Punto de Equilibrio
          </h1>
          <p className="text-gray-600 mt-2">
            Calcula cuánto debes vender para cubrir tus costos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-5">
            <label className="font-bold text-gray-700">
              Precio de venta unitario
            </label>
            <input
              type="number"
              value={precioVenta}
              onChange={(e) => setPrecioVenta(e.target.value)}
              placeholder="Ej: 35"
              className="mt-3 w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-[#8500B8]"
            />
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <label className="font-bold text-gray-700">
              Costo variable unitario
            </label>
            <input
              type="number"
              value={costoVariable}
              onChange={(e) => setCostoVariable(e.target.value)}
              placeholder="Ej: 20"
              className="mt-3 w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-[#8500B8]"
            />
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <label className="font-bold text-gray-700">
              Costos fijos totales
            </label>
            <input
              type="number"
              value={costosFijos}
              onChange={(e) => setCostosFijos(e.target.value)}
              placeholder="Ej: 1000"
              className="mt-3 w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-[#8500B8]"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Margen de contribución</p>
            <h2 className="text-3xl font-black text-[#8500B8]">
              S/ {margenContribucion.toFixed(2)}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Punto de equilibrio</p>
            <h2 className="text-3xl font-black text-green-600">
              {Math.ceil(puntoUnidades)} unidades
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Ventas necesarias</p>
            <h2 className="text-3xl font-black text-[#1D1B3A]">
              S/ {puntoVentas.toFixed(2)}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="text-2xl font-black text-[#1D1B3A] mb-5">
            Análisis Zentry
          </h2>

          {precio === 0 || fijo === 0 ? (
            <p className="text-gray-500">
              Ingresa los datos para calcular tu punto de equilibrio.
            </p>
          ) : margenContribucion <= 0 ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-xl">
              <p className="font-bold text-red-600">
                Tu negocio no puede llegar al punto de equilibrio.
              </p>
              <p className="text-gray-700 mt-2">
                El precio de venta debe ser mayor que el costo variable unitario.
              </p>
            </div>
          ) : (
            <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-xl">
              <p className="font-bold text-green-700">
                Necesitas vender {Math.ceil(puntoUnidades)} unidades.
              </p>
              <p className="text-gray-700 mt-2">
                A partir de esa cantidad, tu negocio empieza a generar ganancia.
              </p>
            </div>
          )}
        </div>

        <button
          onClick={limpiar}
          className="bg-[#8500B8] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#6f009c] transition"
        >
          Limpiar datos
        </button>
      </div>
    </div>
  );
}