"use client";

import { useState } from "react";

type Ingreso = {
  id: number;
  fecha: string;
  concepto: string;
  categoria: string;
  metodoPago: string;
  cliente: string;
  monto: number;
  observacion: string;
};

const fechaHoy = () => new Date().toISOString().slice(0, 10);

export default function IngresosPage() {
  const [ingresos, setIngresos] = useState<Ingreso[]>([
    {
      id: 1,
      fecha: fechaHoy(),
      concepto: "Venta de polos",
      categoria: "Ventas",
      metodoPago: "Yape",
      cliente: "Cliente frecuente",
      monto: 280,
      observacion: "",
    },
    {
      id: 2,
      fecha: "2026-06-28",
      concepto: "Pedido por Instagram",
      categoria: "Pedidos por redes",
      metodoPago: "Plin",
      cliente: "Instagram",
      monto: 150,
      observacion: "",
    },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);

  const [fecha, setFecha] = useState(fechaHoy());
  const [concepto, setConcepto] = useState("");
  const [categoria, setCategoria] = useState("Ventas");
  const [metodoPago, setMetodoPago] = useState("Efectivo");
  const [cliente, setCliente] = useState("");
  const [monto, setMonto] = useState("");
  const [observacion, setObservacion] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const limpiarFormulario = () => {
    setEditandoId(null);
    setFecha(fechaHoy());
    setConcepto("");
    setCategoria("Ventas");
    setMetodoPago("Efectivo");
    setCliente("");
    setMonto("");
    setObservacion("");
  };

  const guardarIngreso = () => {
    if (!concepto || !monto) {
      alert("Completa concepto y monto.");
      return;
    }

    if (editandoId !== null) {
      setIngresos(
        ingresos.map((ingreso) =>
          ingreso.id === editandoId
            ? {
                ...ingreso,
                fecha,
                concepto,
                categoria,
                metodoPago,
                cliente,
                monto: Number(monto),
                observacion,
              }
            : ingreso
        )
      );
    } else {
      const nuevoIngreso: Ingreso = {
        id: Date.now(),
        fecha,
        concepto,
        categoria,
        metodoPago,
        cliente,
        monto: Number(monto),
        observacion,
      };

      setIngresos([nuevoIngreso, ...ingresos]);
    }

    limpiarFormulario();
  };

  const editarIngreso = (ingreso: Ingreso) => {
    setEditandoId(ingreso.id);
    setFecha(ingreso.fecha);
    setConcepto(ingreso.concepto);
    setCategoria(ingreso.categoria);
    setMetodoPago(ingreso.metodoPago);
    setCliente(ingreso.cliente);
    setMonto(String(ingreso.monto));
    setObservacion(ingreso.observacion);
  };

  const eliminarIngreso = (id: number) => {
    const confirmar = confirm("¿Seguro que deseas eliminar este ingreso?");
    if (!confirmar) return;

    setIngresos(ingresos.filter((ingreso) => ingreso.id !== id));
  };

  const ingresosFiltrados = ingresos.filter((ingreso) =>
    `${ingreso.fecha} ${ingreso.concepto} ${ingreso.categoria} ${ingreso.metodoPago} ${ingreso.cliente}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const totalHoy = ingresos
    .filter((i) => i.fecha === fechaHoy())
    .reduce((total, i) => total + i.monto, 0);

  const totalGeneral = ingresos.reduce((total, i) => total + i.monto, 0);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-5xl font-black">Ingresos</h1>
        <p className="text-gray-500 mt-2">
          Registra y revisa solo el dinero que entra a tu negocio.
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
          <h2 className="text-3xl font-black">{ingresos.length}</h2>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-3xl shadow">
          <p className="text-purple-100">Estado</p>
          <h2 className="text-3xl font-black">Activo</h2>
        </div>
      </section>

      <section className="bg-white p-8 rounded-3xl shadow">
        <h2 className="text-3xl font-black mb-6">
          {editandoId ? "Editar ingreso" : "Registrar ingreso"}
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label>Concepto</label>
            <input
              value={concepto}
              onChange={(e) => setConcepto(e.target.value)}
              placeholder="Ej. Venta de polos"
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
              <option>Ventas</option>
              <option>Servicios</option>
              <option>Pedidos por redes</option>
              <option>Inversión</option>
              <option>Otros ingresos</option>
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
            <label>Cliente</label>
            <input
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Ej. Cliente frecuente"
              className="w-full border p-4 rounded-2xl mt-2"
            />
          </div>

          <div className="md:col-span-2">
            <label>Observaciones</label>
            <textarea
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Ej. Pago completo, adelanto, venta por Instagram..."
              className="w-full border p-4 rounded-2xl mt-2 min-h-28"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={guardarIngreso}
            className="bg-purple-600 text-white px-8 py-4 rounded-2xl font-bold"
          >
            {editandoId ? "Guardar cambios" : "Guardar ingreso"}
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
          <h2 className="text-3xl font-black">Historial de ingresos</h2>

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
              {ingresosFiltrados.map((ingreso) => (
                <tr key={ingreso.id} className="border-t">
                  <td className="p-4">{ingreso.fecha}</td>
                  <td className="p-4">{ingreso.concepto}</td>
                  <td className="p-4">{ingreso.categoria}</td>
                  <td className="p-4">{ingreso.metodoPago}</td>
                  <td className="p-4 font-bold text-green-600">
                    S/ {ingreso.monto.toFixed(2)}
                  </td>
                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() => editarIngreso(ingreso)}
                      className="bg-purple-100 text-purple-700 px-4 py-2 rounded-xl font-bold"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => eliminarIngreso(ingreso.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {ingresosFiltrados.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No hay ingresos registrados.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}