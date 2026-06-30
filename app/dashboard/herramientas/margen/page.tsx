"use client";

import { useState } from "react";

export default function MargenPage() {
  const [precioVenta, setPrecioVenta] = useState("");
  const [costoUnitario, setCostoUnitario] = useState("");
  const [unidades, setUnidades] = useState("");

  const precio = Number(precioVenta);
  const costo = Number(costoUnitario);
  const cantidad = Number(unidades);

  const ingresos = precio * cantidad;
  const costos = costo * cantidad;
  const ganancia = ingresos - costos;

  const margen =
    ingresos > 0 ? (ganancia / ingresos) * 100 : 0;

  const markup =
    costos > 0 ? (ganancia / costos) * 100 : 0;

  const limpiar = () => {
    setPrecioVenta("");
    setCostoUnitario("");
    setUnidades("");
  };

  return (
    <div className="min-h-screen bg-[#F8F4FF] p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <div>
          <h1 className="text-4xl font-black text-[#1D1B3A]">
            Calculadora de Margen
          </h1>
          <p className="text-gray-600 mt-2">
            Calcula cuánto ganas realmente por cada producto vendido.
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
              Costo unitario
            </label>
            <input
              type="number"
              value={costoUnitario}
              onChange={(e) => setCostoUnitario(e.target.value)}
              placeholder="Ej: 20"
              className="mt-3 w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-[#8500B8]"
            />
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <label className="font-bold text-gray-700">
              Unidades vendidas
            </label>
            <input
              type="number"
              value={unidades}
              onChange={(e) => setUnidades(e.target.value)}
              placeholder="Ej: 50"
              className="mt-3 w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-[#8500B8]"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Ingresos</p>
            <h2 className="text-3xl font-black text-[#8500B8]">
              S/ {ingresos.toFixed(2)}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Costos</p>
            <h2 className="text-3xl font-black text-red-500">
              S/ {costos.toFixed(2)}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Ganancia</p>
            <h2
              className={`text-3xl font-black ${
                ganancia >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              S/ {ganancia.toFixed(2)}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Margen</p>
            <h2 className="text-3xl font-black text-[#1D1B3A]">
              {margen.toFixed(2)}%
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Markup</p>
            <h2 className="text-3xl font-black text-[#8500B8]">
              {markup.toFixed(2)}%
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="text-2xl font-black text-[#1D1B3A] mb-5">
            Análisis Zentry
          </h2>

          {ingresos === 0 ? (
            <p className="text-gray-500">
              Ingresa tus datos para calcular el margen.
            </p>
          ) : ganancia < 0 ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-xl">
              <p className="font-bold text-red-600">
                Estás vendiendo con pérdida.
              </p>
              <p className="text-gray-700 mt-2">
                Tu costo es mayor que tu precio de venta. Revisa tus costos o
                aumenta tu precio.
              </p>
            </div>
          ) : margen < 20 ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-xl">
              <p className="font-bold text-yellow-700">
                Tu margen es bajo.
              </p>
              <p className="text-gray-700 mt-2">
                Puedes mejorar reduciendo costos, subiendo precios o vendiendo
                productos con mayor rentabilidad.
              </p>
            </div>
          ) : margen <= 40 ? (
            <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-xl">
              <p className="font-bold text-green-700">
                Tu margen es saludable.
              </p>
              <p className="text-gray-700 mt-2">
                Tu negocio está generando una ganancia razonable por cada venta.
              </p>
            </div>
          ) : (
            <div className="bg-purple-50 border-l-4 border-[#8500B8] p-5 rounded-xl">
              <p className="font-bold text-[#8500B8]">
                Excelente margen.
              </p>
              <p className="text-gray-700 mt-2">
                Tu producto tiene una alta rentabilidad. Mantén controlados tus
                costos para conservar esa ganancia.
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