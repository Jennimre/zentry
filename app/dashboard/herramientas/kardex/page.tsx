"use client";

import { useEffect, useState } from "react";

type TipoMovimiento = "entrada" | "salida";

type Movimiento = {
  id: number;
  fecha: string;
  producto: string;
  tipo: TipoMovimiento;
  cantidad: number;
  costoUnitario: number;
  descripcion: string;
};

type FilaKardex = Movimiento & {
  entradaCantidad: number;
  entradaCU: number;
  entradaTotal: number;
  salidaCantidad: number;
  salidaCU: number;
  salidaTotal: number;
  saldoCantidad: number;
  saldoCU: number;
  saldoTotal: number;
};

export default function KardexPage() {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const [form, setForm] = useState({
    fecha: new Date().toISOString().split("T")[0],
    producto: "",
    tipo: "entrada" as TipoMovimiento,
    cantidad: "",
    costoUnitario: "",
    descripcion: "",
  });

  useEffect(() => {
    const guardado = localStorage.getItem("zentry-kardex");
    if (guardado) setMovimientos(JSON.parse(guardado));
  }, []);

  useEffect(() => {
    localStorage.setItem("zentry-kardex", JSON.stringify(movimientos));
  }, [movimientos]);

  const filasKardex: FilaKardex[] = [...movimientos]
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
    .reduce((filas: FilaKardex[], mov) => {
      const saldoAnterior = filas[filas.length - 1];

      const saldoCantidadAnterior = saldoAnterior?.saldoCantidad || 0;
      const saldoTotalAnterior = saldoAnterior?.saldoTotal || 0;

      const totalMovimiento = mov.cantidad * mov.costoUnitario;

      let saldoCantidad = saldoCantidadAnterior;
      let saldoTotal = saldoTotalAnterior;

      if (mov.tipo === "entrada") {
        saldoCantidad += mov.cantidad;
        saldoTotal += totalMovimiento;
      } else {
        saldoCantidad -= mov.cantidad;
        saldoTotal -= totalMovimiento;
      }

      const saldoCU = saldoCantidad > 0 ? saldoTotal / saldoCantidad : 0;

      filas.push({
        ...mov,
        entradaCantidad: mov.tipo === "entrada" ? mov.cantidad : 0,
        entradaCU: mov.tipo === "entrada" ? mov.costoUnitario : 0,
        entradaTotal: mov.tipo === "entrada" ? totalMovimiento : 0,
        salidaCantidad: mov.tipo === "salida" ? mov.cantidad : 0,
        salidaCU: mov.tipo === "salida" ? mov.costoUnitario : 0,
        salidaTotal: mov.tipo === "salida" ? totalMovimiento : 0,
        saldoCantidad,
        saldoCU,
        saldoTotal,
      });

      return filas;
    }, []);

  const stockActual = filasKardex.at(-1)?.saldoCantidad || 0;
  const valorInventario = filasKardex.at(-1)?.saldoTotal || 0;
  const costoPromedio = filasKardex.at(-1)?.saldoCU || 0;

  const registrarMovimiento = () => {
    const cantidad = Number(form.cantidad);
    const costoUnitario = Number(form.costoUnitario);

    if (!form.producto || cantidad <= 0 || costoUnitario < 0) {
      alert("Completa producto, cantidad y costo unitario.");
      return;
    }

    const movimiento: Movimiento = {
      id: editandoId ?? Date.now(),
      fecha: form.fecha,
      producto: form.producto,
      tipo: form.tipo,
      cantidad,
      costoUnitario,
      descripcion: form.descripcion,
    };

    if (editandoId) {
      setMovimientos(
        movimientos.map((m) => (m.id === editandoId ? movimiento : m))
      );
    } else {
      setMovimientos([...movimientos, movimiento]);
    }

    limpiarFormulario();
  };

  const editarMovimiento = (mov: Movimiento) => {
    setEditandoId(mov.id);
    setForm({
      fecha: mov.fecha,
      producto: mov.producto,
      tipo: mov.tipo,
      cantidad: String(mov.cantidad),
      costoUnitario: String(mov.costoUnitario),
      descripcion: mov.descripcion,
    });
  };

  const eliminarMovimiento = (id: number) => {
    if (!confirm("¿Eliminar este movimiento?")) return;
    setMovimientos(movimientos.filter((m) => m.id !== id));
  };

  const limpiarFormulario = () => {
    setEditandoId(null);
    setForm({
      fecha: new Date().toISOString().split("T")[0],
      producto: "",
      tipo: "entrada",
      cantidad: "",
      costoUnitario: "",
      descripcion: "",
    });
  };

  const formatoSoles = (valor: number) => `S/ ${valor.toFixed(2)}`;

  return (
    <div className="min-h-screen bg-[#F8F4FF] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-black text-[#1D1B3A]">Kardex</h1>
          <p className="text-gray-600 mt-2">
            Controla entradas, salidas y saldo de inventario.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Stock actual</p>
            <h2 className="text-3xl font-black text-[#8500B8]">
              {stockActual} unidades
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Valor inventario</p>
            <h2 className="text-3xl font-black text-green-600">
              {formatoSoles(valorInventario)}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Costo promedio</p>
            <h2 className="text-3xl font-black text-[#1D1B3A]">
              {formatoSoles(costoPromedio)}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-8 space-y-6">
          <h2 className="text-2xl font-black text-[#1D1B3A]">
            {editandoId ? "Editar movimiento" : "Nuevo movimiento"}
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="date"
              value={form.fecha}
              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              className="p-4 rounded-xl border"
            />

            <input
              type="text"
              value={form.producto}
              onChange={(e) => setForm({ ...form, producto: e.target.value })}
              placeholder="Producto"
              className="p-4 rounded-xl border"
            />

            <select
              value={form.tipo}
              onChange={(e) =>
                setForm({ ...form, tipo: e.target.value as TipoMovimiento })
              }
              className="p-4 rounded-xl border"
            >
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
            </select>

            <input
              type="number"
              value={form.cantidad}
              onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
              placeholder="Cantidad"
              className="p-4 rounded-xl border"
            />

            <input
              type="number"
              value={form.costoUnitario}
              onChange={(e) =>
                setForm({ ...form, costoUnitario: e.target.value })
              }
              placeholder="Costo unitario"
              className="p-4 rounded-xl border"
            />

            <input
              type="text"
              value={form.descripcion}
              onChange={(e) =>
                setForm({ ...form, descripcion: e.target.value })
              }
              placeholder="Descripción"
              className="p-4 rounded-xl border"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={registrarMovimiento}
              className="bg-[#8500B8] text-white px-6 py-3 rounded-xl font-bold"
            >
              {editandoId ? "Guardar cambios" : "Registrar movimiento"}
            </button>

            <button
              onClick={limpiarFormulario}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold"
            >
              Limpiar
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-8 overflow-x-auto">
          <h2 className="text-2xl font-black text-[#1D1B3A] mb-5">
            Kardex valorizado
          </h2>

          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#F8F4FF]">
                <th rowSpan={2} className="p-3 border">Fecha</th>
                <th rowSpan={2} className="p-3 border">Producto</th>
                <th rowSpan={2} className="p-3 border">Detalle</th>
                <th colSpan={3} className="p-3 border text-green-700">Entradas</th>
                <th colSpan={3} className="p-3 border text-red-700">Salidas</th>
                <th colSpan={3} className="p-3 border text-[#8500B8]">Saldo</th>
                <th rowSpan={2} className="p-3 border">Acciones</th>
              </tr>

              <tr className="bg-[#F8F4FF]">
                <th className="p-3 border">Cantidad</th>
                <th className="p-3 border">C.U.</th>
                <th className="p-3 border">Total</th>
                <th className="p-3 border">Cantidad</th>
                <th className="p-3 border">C.U.</th>
                <th className="p-3 border">Total</th>
                <th className="p-3 border">Cantidad</th>
                <th className="p-3 border">C.U.</th>
                <th className="p-3 border">Total</th>
              </tr>
            </thead>

            <tbody>
              {filasKardex.length === 0 ? (
                <tr>
                  <td colSpan={13} className="p-6 text-center text-gray-500">
                    Aún no hay movimientos registrados.
                  </td>
                </tr>
              ) : (
                filasKardex.map((fila) => (
                  <tr key={fila.id} className="border-b">
                    <td className="p-3 border">{fila.fecha}</td>
                    <td className="p-3 border font-bold">{fila.producto}</td>
                    <td className="p-3 border">{fila.descripcion || fila.tipo}</td>

                    <td className="p-3 border">{fila.entradaCantidad || "-"}</td>
                    <td className="p-3 border">
                      {fila.entradaCU ? formatoSoles(fila.entradaCU) : "-"}
                    </td>
                    <td className="p-3 border">
                      {fila.entradaTotal ? formatoSoles(fila.entradaTotal) : "-"}
                    </td>

                    <td className="p-3 border">{fila.salidaCantidad || "-"}</td>
                    <td className="p-3 border">
                      {fila.salidaCU ? formatoSoles(fila.salidaCU) : "-"}
                    </td>
                    <td className="p-3 border">
                      {fila.salidaTotal ? formatoSoles(fila.salidaTotal) : "-"}
                    </td>

                    <td className="p-3 border font-bold">{fila.saldoCantidad}</td>
                    <td className="p-3 border font-bold">
                      {formatoSoles(fila.saldoCU)}
                    </td>
                    <td className="p-3 border font-bold">
                      {formatoSoles(fila.saldoTotal)}
                    </td>

                    <td className="p-3 border">
                      <div className="flex gap-2">
                        <button
                          onClick={() => editarMovimiento(fila)}
                          className="bg-yellow-100 text-yellow-700 px-3 py-2 rounded-lg font-bold"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => eliminarMovimiento(fila.id)}
                          className="bg-red-100 text-red-700 px-3 py-2 rounded-lg font-bold"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}