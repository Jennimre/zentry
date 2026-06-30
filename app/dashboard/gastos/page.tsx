"use client";

import { useState } from "react";

export default function GastosPage() {
  const [fecha, setFecha] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <div className="space-y-8">

      {/* Encabezado */}
      <div>
        <h1 className="text-4xl font-black text-[#1D1B3A]">
          Gastos
        </h1>

        <p className="text-gray-500 mt-2">
          Administra todos los gastos de tu negocio.
        </p>
      </div>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

        <Card
          titulo="Hoy"
          valor="S/ 185.00"
        />

        <Card
          titulo="Semana"
          valor="S/ 920.00"
        />

        <Card
          titulo="Mes"
          valor="S/ 3,450.00"
        />

        <Card
          titulo="Total registros"
          valor="28"
          morado
        />

      </div>

      {/* Registrar gasto */}
      <div className="bg-white rounded-3xl shadow p-7">

        <h2 className="text-2xl font-bold mb-6">
          Registrar gasto
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="font-semibold">
              Concepto
            </label>

            <input
              placeholder="Ej. Compra de tela"
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="font-semibold">
              Categoría
            </label>

            <select
              className="w-full mt-2 border rounded-xl p-3"
            >
              <option>Materia prima</option>
              <option>Transporte</option>
              <option>Servicios</option>
              <option>Marketing</option>
              <option>Alquiler</option>
              <option>Sueldos</option>
              <option>Otros</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">
              Monto
            </label>

            <input
              type="number"
              placeholder="0.00"
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="font-semibold">
              Fecha
            </label>

            <input
              type="date"
              value={fecha}
              onChange={(e) =>
                setFecha(e.target.value)
              }
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div className="md:col-span-2">

            <label className="font-semibold">
              Observaciones
            </label>

            <textarea
              rows={4}
              placeholder="Escribe un comentario..."
              className="w-full mt-2 border rounded-xl p-3"
            />

          </div>

        </div>

        <button
          className="mt-6 bg-[#8500B8] hover:bg-[#6d00a8] text-white px-8 py-3 rounded-xl font-bold"
        >
          Guardar gasto
        </button>

      </div>

      {/* Historial */}

      <div className="bg-white rounded-3xl shadow p-7">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Historial de gastos
          </h2>

          <input
            placeholder="Buscar..."
            className="border rounded-xl p-3"
          />

        </div>

        <table className="w-full">

          <thead className="bg-violet-50">

            <tr>

              <th className="text-left p-4">
                Fecha
              </th>

              <th className="text-left p-4">
                Concepto
              </th>

              <th className="text-left p-4">
                Categoría
              </th>

              <th className="text-left p-4">
                Monto
              </th>

              <th className="text-left p-4">
                Acción
              </th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b">

              <td className="p-4">
                29/06/2026
              </td>

              <td className="p-4">
                Compra de tela
              </td>

              <td className="p-4">
                Materia prima
              </td>

              <td className="p-4">
                S/ 350
              </td>

              <td className="p-4 space-x-2">

                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Editar
                </button>

                <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                  Eliminar
                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

function Card({
  titulo,
  valor,
  morado = false,
}: {
  titulo: string;
  valor: string;
  morado?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl p-6 shadow ${
        morado
          ? "bg-[#8500B8] text-white"
          : "bg-white"
      }`}
    >
      <p
        className={
          morado
            ? "text-violet-100"
            : "text-gray-500"
        }
      >
        {titulo}
      </p>

      <h2 className="text-3xl font-bold mt-3">
        {valor}
      </h2>
    </div>
  );
}