"use client";

import { useState } from "react";

export default function GananciasPage() {
  const [ingresos, setIngresos] = useState("");
  const [costos, setCostos] = useState("");
  const [gastos, setGastos] = useState("");
  const [impuestos, setImpuestos] = useState("");

  const ingresosNum = Number(ingresos);
  const costosNum = Number(costos);
  const gastosNum = Number(gastos);
  const impuestosNum = Number(impuestos);

  const utilidadBruta = ingresosNum - costosNum;
  const utilidadOperativa = utilidadBruta - gastosNum;
  const utilidadNeta = utilidadOperativa - impuestosNum;

  const margenBruto =
    ingresosNum > 0 ? (utilidadBruta / ingresosNum) * 100 : 0;

  const margenNeto =
    ingresosNum > 0 ? (utilidadNeta / ingresosNum) * 100 : 0;

  const rentabilidad =
    ingresosNum > 0 ? (utilidadNeta / ingresosNum) * 100 : 0;

  const limpiar = () => {
    setIngresos("");
    setCostos("");
    setGastos("");
    setImpuestos("");
  };

  return (
    <div className="min-h-screen bg-[#F8F4FF] p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <div>
          <h1 className="text-4xl font-black text-[#1D1B3A]">
            Calculadora de Ganancias
          </h1>

          <p className="text-gray-600 mt-2">
            Analiza la rentabilidad de tu negocio de forma rápida.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow p-5">
            <label className="font-bold text-gray-700">
              Ingresos Totales
            </label>

            <input
              type="number"
              value={ingresos}
              onChange={(e) => setIngresos(e.target.value)}
              placeholder="0"
              className="mt-3 w-full p-3 border rounded-xl"
            />
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <label className="font-bold text-gray-700">
              Costos
            </label>

            <input
              type="number"
              value={costos}
              onChange={(e) => setCostos(e.target.value)}
              placeholder="0"
              className="mt-3 w-full p-3 border rounded-xl"
            />
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <label className="font-bold text-gray-700">
              Gastos Operativos
            </label>

            <input
              type="number"
              value={gastos}
              onChange={(e) => setGastos(e.target.value)}
              placeholder="0"
              className="mt-3 w-full p-3 border rounded-xl"
            />
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <label className="font-bold text-gray-700">
              Impuestos
            </label>

            <input
              type="number"
              value={impuestos}
              onChange={(e) => setImpuestos(e.target.value)}
              placeholder="0"
              className="mt-3 w-full p-3 border rounded-xl"
            />
          </div>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Utilidad Bruta</p>

            <h2 className="text-3xl font-black text-[#8500B8]">
              S/ {utilidadBruta.toFixed(2)}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Utilidad Operativa</p>

            <h2 className="text-3xl font-black text-blue-600">
              S/ {utilidadOperativa.toFixed(2)}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Utilidad Neta</p>

            <h2 className="text-3xl font-black text-green-600">
              S/ {utilidadNeta.toFixed(2)}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Margen Bruto</p>

            <h2 className="text-3xl font-black text-[#1D1B3A]">
              {margenBruto.toFixed(2)}%
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Margen Neto</p>

            <h2 className="text-3xl font-black text-[#8500B8]">
              {margenNeto.toFixed(2)}%
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Rentabilidad</p>

            <h2 className="text-3xl font-black text-green-600">
              {rentabilidad.toFixed(2)}%
            </h2>
          </div>

        </div>

        <div className="bg-white rounded-3xl shadow p-8">

          <h2 className="text-2xl font-black text-[#1D1B3A] mb-5">
            Análisis Zentry
          </h2>

          {ingresosNum === 0 ? (
            <p className="text-gray-500">
              Ingresa la información para comenzar el análisis.
            </p>
          ) : utilidadNeta < 0 ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-xl">
              <p className="font-bold text-red-600">
                Tu negocio está generando pérdidas.
              </p>

              <p className="mt-2 text-gray-700">
                Revisa tus costos y gastos. Intenta reducir gastos operativos
                o incrementar tus ventas.
              </p>
            </div>
          ) : margenNeto < 15 ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-xl">
              <p className="font-bold text-yellow-700">
                Tu margen de ganancia es bajo.
              </p>

              <p className="mt-2 text-gray-700">
                Evalúa aumentar precios o reducir costos para mejorar tu utilidad.
              </p>
            </div>
          ) : (
            <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-xl">
              <p className="font-bold text-green-700">
                ¡Excelente trabajo!
              </p>

              <p className="mt-2 text-gray-700">
                Tu negocio genera una utilidad saludable y presenta una buena
                rentabilidad.
              </p>
            </div>
          )}

        </div>

        <button
          onClick={limpiar}
          className="bg-[#8500B8] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#6d00a3] transition"
        >
          Limpiar datos
        </button>

      </div>
    </div>
  );
}