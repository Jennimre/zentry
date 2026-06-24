"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

type Movimiento = {
  fecha: string;
  concepto: string;
  tipo: "entrada" | "salida";
  cantidad: number;
  costoUnitario: number;
  entradaTotal: number;
  salidaTotal: number;
  saldoCantidad: number;
  saldoValor: number;
  costoPromedio: number;
};

export default function KardexPage() {
  const [fecha, setFecha] = useState("");
  const [concepto, setConcepto] = useState("");
  const [tipo, setTipo] = useState<"entrada" | "salida">("entrada");
  const [cantidad, setCantidad] = useState("");
  const [costoUnitario, setCostoUnitario] = useState("");
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

  const agregarMovimiento = () => {
    if (!fecha || !concepto || !cantidad) return;

    const cant = Number(cantidad);
    const costo = Number(costoUnitario) || 0;
    const ultimo = movimientos[movimientos.length - 1];

    const saldoAnteriorCantidad = ultimo?.saldoCantidad || 0;
    const saldoAnteriorValor = ultimo?.saldoValor || 0;
    const promedioAnterior = ultimo?.costoPromedio || 0;

    let entradaTotal = 0;
    let salidaTotal = 0;
    let saldoCantidad = saldoAnteriorCantidad;
    let saldoValor = saldoAnteriorValor;
    let costoPromedio = promedioAnterior;

    if (tipo === "entrada") {
      entradaTotal = cant * costo;
      saldoCantidad = saldoAnteriorCantidad + cant;
      saldoValor = saldoAnteriorValor + entradaTotal;
      costoPromedio = saldoCantidad > 0 ? saldoValor / saldoCantidad : 0;
    }

    if (tipo === "salida") {
      salidaTotal = cant * promedioAnterior;
      saldoCantidad = saldoAnteriorCantidad - cant;
      saldoValor = saldoAnteriorValor - salidaTotal;
      costoPromedio = saldoCantidad > 0 ? saldoValor / saldoCantidad : 0;
    }

    const nuevo: Movimiento = {
      fecha,
      concepto,
      tipo,
      cantidad: cant,
      costoUnitario: tipo === "entrada" ? costo : promedioAnterior,
      entradaTotal,
      salidaTotal,
      saldoCantidad,
      saldoValor,
      costoPromedio,
    };

    setMovimientos([...movimientos, nuevo]);
    setFecha("");
    setConcepto("");
    setCantidad("");
    setCostoUnitario("");
  };

  const descargarExcel = () => {
    const data = movimientos.map((m) => ({
      Fecha: m.fecha,
      Concepto: m.concepto,
      "Entrada Cant.": m.tipo === "entrada" ? m.cantidad : "",
      "Entrada C.U.": m.tipo === "entrada" ? m.costoUnitario : "",
      "Entrada Total": m.tipo === "entrada" ? m.entradaTotal : "",
      "Salida Cant.": m.tipo === "salida" ? m.cantidad : "",
      "Salida C.U.": m.tipo === "salida" ? m.costoUnitario : "",
      "Salida Total": m.tipo === "salida" ? m.salidaTotal : "",
      "Saldo Cant.": m.saldoCantidad,
      "Saldo C.U.": m.costoPromedio,
      "Saldo Total": m.saldoValor,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Kardex");
    XLSX.writeFile(wb, "kardex_promedio_ponderado.xlsx");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#F8F3FF] to-[#EFE4FF] p-10">
      <a href="/herramientas" className="font-bold text-[#6D28D9]">
        ← Volver
      </a>

      <h1 className="text-5xl font-black mt-8 mb-2">
        📦 Kardex Automático
      </h1>

      <p className="text-xl text-gray-500 mb-10">
        Método: Promedio Ponderado
      </p>

      <div className="bg-white p-8 rounded-3xl shadow-xl mb-10">
        <h2 className="text-2xl font-black mb-5">Registrar Movimiento</h2>

        <div className="grid md:grid-cols-5 gap-4">
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="border p-3 rounded-xl"
          />

          <input
            placeholder="Concepto"
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
            className="border p-3 rounded-xl"
          />

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as "entrada" | "salida")}
            className="border p-3 rounded-xl"
          >
            <option value="entrada">Entrada / Compra</option>
            <option value="salida">Salida / Consumo</option>
          </select>

          <input
            type="number"
            placeholder="Cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            className="border p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Costo Unitario"
            value={costoUnitario}
            onChange={(e) => setCostoUnitario(e.target.value)}
            disabled={tipo === "salida"}
            className="border p-3 rounded-xl disabled:bg-gray-100"
          />
        </div>

        <button
          onClick={agregarMovimiento}
          className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-2xl font-bold"
        >
          Agregar Movimiento
        </button>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl overflow-auto">
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-black">Tabla Kardex</h2>

          <button
            onClick={descargarExcel}
            className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold"
          >
            Descargar Excel
          </button>
        </div>

        <table className="w-full text-center border border-black text-sm">
          <thead>
            <tr className="bg-[#F0E4FF]">
              <th rowSpan={2} className="border border-black p-2">Fecha</th>
              <th rowSpan={2} className="border border-black p-2">Concepto</th>
              <th colSpan={3} className="border border-black p-2">Entradas</th>
              <th colSpan={3} className="border border-black p-2">Salidas</th>
              <th colSpan={3} className="border border-black p-2">Saldos</th>
            </tr>

            <tr className="bg-[#F8F3FF]">
              <th className="border border-black p-2">Cant.</th>
              <th className="border border-black p-2">C.U.</th>
              <th className="border border-black p-2">Total</th>

              <th className="border border-black p-2">Cant.</th>
              <th className="border border-black p-2">C.U.</th>
              <th className="border border-black p-2">Total</th>

              <th className="border border-black p-2">Cant.</th>
              <th className="border border-black p-2">C.U.</th>
              <th className="border border-black p-2">Total</th>
            </tr>
          </thead>

          <tbody>
            {movimientos.map((m, i) => (
              <tr key={i}>
                <td className="border border-black p-2">{m.fecha}</td>
                <td className="border border-black p-2">{m.concepto}</td>

                <td className="border border-black p-2">
                  {m.tipo === "entrada" ? m.cantidad : ""}
                </td>
                <td className="border border-black p-2">
                  {m.tipo === "entrada" ? `S/ ${m.costoUnitario.toFixed(2)}` : ""}
                </td>
                <td className="border border-black p-2">
                  {m.tipo === "entrada" ? `S/ ${m.entradaTotal.toFixed(2)}` : ""}
                </td>

                <td className="border border-black p-2">
                  {m.tipo === "salida" ? m.cantidad : ""}
                </td>
                <td className="border border-black p-2">
                  {m.tipo === "salida" ? `S/ ${m.costoUnitario.toFixed(2)}` : ""}
                </td>
                <td className="border border-black p-2">
                  {m.tipo === "salida" ? `S/ ${m.salidaTotal.toFixed(2)}` : ""}
                </td>

                <td className="border border-black p-2">{m.saldoCantidad}</td>
                <td className="border border-black p-2">
                  S/ {m.costoPromedio.toFixed(2)}
                </td>
                <td className="border border-black p-2">
                  S/ {m.saldoValor.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}