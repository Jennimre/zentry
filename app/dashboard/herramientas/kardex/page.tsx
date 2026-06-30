"use client";

import { useEffect, useState } from "react";

type Movimiento = {
  id: number;
  fecha: string;
  producto: string;
  tipo: "entrada" | "salida";
  cantidad: number;
  costoUnitario: number;
  descripcion: string;
};

export default function KardexPage() {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const [form, setForm] = useState({
    fecha: new Date().toISOString().split("T")[0],
    producto: "",
    tipo: "entrada" as "entrada" | "salida",
    cantidad: "",
    costoUnitario: "",
    descripcion: "",
  });

  useEffect(() => {
    const datosGuardados = localStorage.getItem("zentry-kardex");
    if (datosGuardados) {
      setMovimientos(JSON.parse(datosGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("zentry-kardex", JSON.stringify(movimientos));
  }, [movimientos]);

  const cantidad = Number(form.cantidad);
  const costoUnitario = Number(form.costoUnitario);
  const valorTotal = cantidad * costoUnitario;

  const stockActual = movimientos.reduce((total, mov) => {
    return mov.tipo === "entrada"
      ? total + mov.cantidad
      : total - mov.cantidad;
  }, 0);

  const valorInventario = movimientos.reduce((total, mov) => {
    const valor = mov.cantidad * mov.costoUnitario;
    return mov.tipo === "entrada" ? total + valor : total - valor;
  }, 0);

  const costoPromedio =
    stockActual > 0 ? valorInventario / stockActual : 0;

  const registrarMovimiento = () => {
    if (!form.producto || !form.cantidad || !form.costoUnitario) {
      alert("Completa producto, cantidad y costo unitario.");
      return;
    }

    if (cantidad <= 0 || costoUnitario < 0) {
      alert("La cantidad debe ser mayor a 0.");
      return;
    }

    const nuevoMovimiento: Movimiento = {
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
        movimientos.map((mov) =>
          mov.id === editandoId ? nuevoMovimiento : mov
        )
      );
      setEditandoId(null);
    } else {
      setMovimientos([nuevoMovimiento, ...movimientos]);
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
    const confirmar = confirm("¿Eliminar este movimiento?");
    if (!confirmar) return;

    setMovimientos(movimientos.filter((mov) => mov.id !== id));
  };

  const limpiarFormulario = () => {
    setForm({
      fecha: new Date().toISOString().split("T")[0],
      producto: "",
      tipo: "entrada",
      cantidad: "",
      costoUnitario: "",
      descripcion: "",
    });
    setEditandoId(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F4FF] p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <div>
          <h1 className="text-4xl font-black text-[#1D1B3A]">
            Kardex
          </h1>
          <p className="text-gray-600 mt-2">
            Registra entradas y salidas de inventario de tu negocio.
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
            <p className="text-gray-500">Valor del inventario</p>
            <h2 className="text-3xl font-black text-green-600">
              S/ {valorInventario.toFixed(2)}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Costo promedio</p>
            <h2 className="text-3xl font-black text-[#1D1B3A]">
              S/ {costoPromedio.toFixed(2)}
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
              onChange={(e) =>
                setForm({ ...form, fecha: e.target.value })
              }
              className="p-4 rounded-xl border"
            />

            <input
              type="text"
              value={form.producto}
              onChange={(e) =>
                setForm({ ...form, producto: e.target.value })
              }
              placeholder="Producto"
              className="p-4 rounded-xl border"
            />

            <select
              value={form.tipo}
              onChange={(e) =>
                setForm({
                  ...form,
                  tipo: e.target.value as "entrada" | "salida",
                })
              }
              className="p-4 rounded-xl border"
            >
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
            </select>

            <input
              type="number"
              value={form.cantidad}
              onChange={(e) =>
                setForm({ ...form, cantidad: e.target.value })
              }
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

          <div className="bg-[#F8F4FF] p-4 rounded-xl">
            <p className="text-gray-700">
              Valor del movimiento:{" "}
              <strong>S/ {valorTotal.toFixed(2)}</strong>
            </p>
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
            Movimientos registrados
          </h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#F8F4FF] text-left">
                <th className="p-4">Fecha</th>
                <th className="p-4">Producto</th>
                <th className="p-4">Tipo</th>
                <th className="p-4">Cantidad</th>
                <th className="p-4">Costo Unit.</th>
                <th className="p-4">Total</th>
                <th className="p-4">Descripción</th>
                <th className="p-4">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {movimientos.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-gray-500">
                    Aún no hay movimientos registrados.
                  </td>
                </tr>
              ) : (
                movimientos.map((mov) => (
                  <tr key={mov.id} className="border-b">
                    <td className="p-4">{mov.fecha}</td>
                    <td className="p-4 font-bold">{mov.producto}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          mov.tipo === "entrada"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {mov.tipo}
                      </span>
                    </td>
                    <td className="p-4">{mov.cantidad}</td>
                    <td className="p-4">S/ {mov.costoUnitario.toFixed(2)}</td>
                    <td className="p-4">
                      S/ {(mov.cantidad * mov.costoUnitario).toFixed(2)}
                    </td>
                    <td className="p-4">{mov.descripcion || "-"}</td>
                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => editarMovimiento(mov)}
                        className="bg-yellow-100 text-yellow-700 px-3 py-2 rounded-lg font-bold"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => eliminarMovimiento(mov.id)}
                        className="bg-red-100 text-red-700 px-3 py-2 rounded-lg font-bold"
                      >
                        Eliminar
                      </button>
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