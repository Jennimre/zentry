"use client";

import { useState } from "react";

type Gasto = {
  id: number;
  fecha: string;
  concepto: string;
  categoria: string;
  metodoPago: string;
  proveedor: string;
  monto: number;
  observacion: string;
};

const fechaHoy = () => new Date().toISOString().slice(0, 10);

export default function GastosPage() {
  const [gastos, setGastos] = useState<Gasto[]>([
    {
      id: 1,
      fecha: fechaHoy(),
      concepto: "Compra de tela",
      categoria: "Materia prima",
      metodoPago: "Yape",
      proveedor: "Proveedor textil",
      monto: 350,
      observacion: "",
    },
    {
      id: 2,
      fecha: "2026-06-28",
      concepto: "Publicidad en Instagram",
      categoria: "Marketing",
      metodoPago: "Tarjeta",
      proveedor: "Meta Ads",
      monto: 80,
      observacion: "",
    },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);

  const [fecha, setFecha] = useState(fechaHoy());
  const [concepto, setConcepto] = useState("");
  const [categoria, setCategoria] = useState("Materia prima");
  const [metodoPago, setMetodoPago] = useState("Efectivo");
  const [proveedor, setProveedor] = useState("");
  const [monto, setMonto] = useState("");
  const [observacion, setObservacion] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const limpiarFormulario = () => {
    setEditandoId(null);
    setFecha(fechaHoy());
    setConcepto("");
    setCategoria("Materia prima");
    setMetodoPago("Efectivo");
    setProveedor("");
    setMonto("");
    setObservacion("");
  };

  const guardarGasto = () => {
    if (!concepto || !monto) {
      alert("Completa concepto y monto.");
      return;
    }

    if (editandoId !== null) {
      setGastos(
        gastos.map((gasto) =>
          gasto.id === editandoId
            ? {
                ...gasto,
                fecha,
                concepto,
                categoria,
                metodoPago,
                proveedor,
                monto: Number(monto),
                observacion,
              }
            : gasto
        )
      );
    } else {
      const nuevoGasto: Gasto = {
        id: Date.now(),
        fecha,
        concepto,
        categoria,
        metodoPago,
        proveedor,
        monto: Number(monto),
        observacion,
      };

      setGastos([nuevoGasto, ...gastos]);
    }

    limpiarFormulario();
  };

  const editarGasto = (gasto: Gasto) => {
    setEditandoId(gasto.id);
    setFecha(gasto.fecha);
    setConcepto(gasto.concepto);
    setCategoria(gasto.categoria);
    setMetodoPago(gasto.metodoPago);
    setProveedor(gasto.proveedor);
    setMonto(String(gasto.monto));
    setObservacion(gasto.observacion);
  };

  const eliminarGasto = (id: number) => {
    const confirmar = confirm("¿Seguro que deseas eliminar este gasto?");
    if (!confirmar) return;

    setGastos(gastos.filter((gasto) => gasto.id !== id));
  };

  const gastosFiltrados = gastos.filter((gasto) =>
    `${gasto.fecha} ${gasto.concepto} ${gasto.categoria} ${gasto.metodoPago} ${gasto.proveedor}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const totalHoy = gastos
    .filter((g) => g.fecha === fechaHoy())
    .reduce((total, g) => total + g.monto, 0);

  const totalGeneral = gastos.reduce((total, g) => total + g.monto, 0);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-5xl font-black">Gastos</h1>
        <p className="text-gray-500 mt-2">
          Registra y revisa solo el dinero que sale de tu negocio.
        </p>
      </section>

      <section className="grid md:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-3xl shadow">
          <p className="text-gray-500">Hoy</p>
          <h2 className="text-3xl font-black">S/ {totalHoy.toFixed(2)}</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <p className="text-gray-500">Total acumulado</p>
          <h2 className="text-3xl font-black">S/ {totalGeneral.toFixed(2)}</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <p className="text-gray-500">Registros</p>
          <h2 className="text-3xl font-black">{gastos.length}</h2>
        </div>

        <div className="bg-red-500 text-white p-6 rounded-3xl shadow">
          <p className="text-red-100">Control de gastos</p>
          <h2 className="text-3xl font-black">Activo</h2>
        </div>
      </section>

      <section className="bg-white p-8 rounded-3xl shadow">
        <h2 className="text-3xl font-black mb-6">
          {editandoId ? "Editar gasto" : "Registrar gasto"}
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label>Concepto</label>
            <input
              value={concepto}
              onChange={(e) => setConcepto(e.target.value)}
              placeholder="Ej. Compra de tela"
              className="w-full border p-4 rounded-2xl mt-2"
            />
          </div>

          <div>
            <label>Categoría</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full border p-4 rounded-2xl mt-2"
            >
              <option>Materia prima</option>
              <option>Transporte</option>
              <option>Alquiler</option>
              <option>Servicios</option>
              <option>Marketing</option>
              <option>Personal</option>
              <option>Otros gastos</option>
            </select>
          </div>

          <div>
            <label>Monto</label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="0.00"
              className="w-full border p-4 rounded-2xl mt-2"
            />
          </div>

          <div>
            <label>Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full border p-4 rounded-2xl mt-2"
            />
          </div>

          <div>
            <label>Método de pago</label>
            <select
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
              className="w-full border p-4 rounded-2xl mt-2"
            >
              <option>Efectivo</option>
              <option>Yape</option>
              <option>Plin</option>
              <option>Transferencia</option>
              <option>Tarjeta</option>
            </select>
          </div>

          <div>
            <label>Proveedor / Responsable</label>
            <input
              value={proveedor}
              onChange={(e) => setProveedor(e.target.value)}
              placeholder="Ej. Proveedor textil"
              className="w-full border p-4 rounded-2xl mt-2"
            />
          </div>

          <div className="md:col-span-2">
            <label>Observaciones</label>
            <textarea
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Ej. Compra de insumos, pago de movilidad, recibo..."
              className="w-full border p-4 rounded-2xl mt-2 min-h-28"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={guardarGasto}
            className="bg-red-500 text-white px-8 py-4 rounded-2xl font-bold"
          >
            {editandoId ? "Guardar cambios" : "Guardar gasto"}
          </button>

          {editandoId && (
            <button
              onClick={limpiarFormulario}
              className="bg-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-bold"
            >
              Cancelar
            </button>
          )}
        </div>
      </section>

      <section className="bg-white p-8 rounded-3xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black">Historial de gastos</h2>

          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar..."
            className="border p-4 rounded-2xl"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="p-4">Fecha</th>
                <th className="p-4">Concepto</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Pago</th>
                <th className="p-4">Monto</th>
                <th className="p-4">Acción</th>
              </tr>
            </thead>

            <tbody>
              {gastosFiltrados.map((gasto) => (
                <tr key={gasto.id} className="border-t">
                  <td className="p-4">{gasto.fecha}</td>
                  <td className="p-4">{gasto.concepto}</td>
                  <td className="p-4">{gasto.categoria}</td>
                  <td className="p-4">{gasto.metodoPago}</td>
                  <td className="p-4 font-bold text-red-500">
                    S/ {gasto.monto.toFixed(2)}
                  </td>
                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() => editarGasto(gasto)}
                      className="bg-purple-100 text-purple-700 px-4 py-2 rounded-xl font-bold"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => eliminarGasto(gasto.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {gastosFiltrados.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No hay gastos registrados.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}