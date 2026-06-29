"use client";

import { useMemo, useState } from "react";

type CategoriaIngreso = "Ventas" | "Servicios" | "Inversión" | "Otros ingresos";

type Ingreso = {
  id: number;
  fecha: string;
  concepto: string;
  categoria: CategoriaIngreso;
  monto: number;
  observacion: string;
};

const categorias: CategoriaIngreso[] = [
  "Ventas",
  "Servicios",
  "Inversión",
  "Otros ingresos",
];

const fechaHoy = () => new Date().toISOString().slice(0, 10);

export default function IngresosPage() {
  const [ingresos, setIngresos] = useState<Ingreso[]>([
    {
      id: 1,
      fecha: fechaHoy(),
      concepto: "Venta de polos",
      categoria: "Ventas",
      monto: 600,
      observacion: "Pedido por WhatsApp",
    },
  ]);

  const [fecha, setFecha] = useState(fechaHoy());
  const [concepto, setConcepto] = useState("");
  const [categoria, setCategoria] = useState<CategoriaIngreso>("Ventas");
  const [monto, setMonto] = useState("");
  const [observacion, setObservacion] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const totalIngresos = useMemo(
    () => ingresos.reduce((acc, item) => acc + item.monto, 0),
    [ingresos]
  );

  const ingresosHoy = useMemo(() => {
    const hoy = fechaHoy();
    return ingresos
      .filter((item) => item.fecha === hoy)
      .reduce((acc, item) => acc + item.monto, 0);
  }, [ingresos]);

  const ingresosMes = useMemo(() => {
    const mesActual = fechaHoy().slice(0, 7);
    return ingresos
      .filter((item) => item.fecha.startsWith(mesActual))
      .reduce((acc, item) => acc + item.monto, 0);
  }, [ingresos]);

  const ingresosFiltrados = ingresos.filter((item) => {
    const coincideTexto =
      item.concepto.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.categoria.toLowerCase().includes(busqueda.toLowerCase());

    const coincideCategoria =
      filtroCategoria === "Todas" || item.categoria === filtroCategoria;

    return coincideTexto && coincideCategoria;
  });

  const mayorIngreso = ingresos.length
    ? Math.max(...ingresos.map((item) => item.monto))
    : 1;

  const limpiarFormulario = () => {
    setFecha(fechaHoy());
    setConcepto("");
    setCategoria("Ventas");
    setMonto("");
    setObservacion("");
    setEditandoId(null);
  };

  const guardarIngreso = () => {
    if (!fecha || !concepto || !monto) {
      alert("Completa fecha, concepto y monto.");
      return;
    }

    if (editandoId) {
      setIngresos(
        ingresos.map((item) =>
          item.id === editandoId
            ? {
                ...item,
                fecha,
                concepto,
                categoria,
                monto: Number(monto),
                observacion,
              }
            : item
        )
      );
    } else {
      const nuevoIngreso: Ingreso = {
        id: Date.now(),
        fecha,
        concepto,
        categoria,
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
    setMonto(String(ingreso.monto));
    setObservacion(ingreso.observacion);
  };

  const eliminarIngreso = (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este ingreso?")) return;
    setIngresos(ingresos.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#F8F3FF] to-[#EFE4FF] text-[#15142B] flex">
      <aside className="w-72 min-h-screen bg-white shadow-xl p-8 hidden lg:flex flex-col justify-between">
        <div>
          <a href="/" className="flex items-center gap-4 mb-14">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6D28D9] to-[#9B00FF] text-white flex items-center justify-center text-3xl font-black">
              Z
            </div>
            <h1 className="text-3xl font-black">Zentry</h1>
          </a>

          <nav className="space-y-3 font-bold">
            <a href="/dashboard" className="block p-4 rounded-2xl hover:bg-[#F0E4FF]">
              🏠 Resumen
            </a>

            <a href="/dashboard/ingresos" className="block p-4 rounded-2xl bg-[#F0E4FF] text-[#6D28D9]">
              📈 Ingresos
            </a>

            <a href="/dashboard/gastos" className="block p-4 rounded-2xl hover:bg-[#F0E4FF]">
              💼 Gastos
            </a>

            <a href="/dashboard/metas" className="block p-4 rounded-2xl hover:bg-[#F0E4FF]">
              🎯 Metas
            </a>

            <a href="/cursos" className="block p-4 rounded-2xl hover:bg-[#F0E4FF]">
              🎓 Cursos
            </a>

            <a href="/herramientas" className="block p-4 rounded-2xl hover:bg-[#F0E4FF]">
              🛠 Herramientas
            </a>
          </nav>
        </div>

        <a
          href="/login"
          className="block text-center bg-red-500 text-white py-4 rounded-2xl font-black"
        >
          Cerrar sesión
        </a>
      </aside>

      <section className="flex-1 p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="bg-[#F0E4FF] text-[#6D28D9] px-5 py-3 rounded-full font-bold inline-block">
                💰 Módulo de ingresos
              </span>

              <h1 className="text-5xl font-black mt-6">Ingresos</h1>

              <p className="text-xl text-[#5E5878] mt-3">
                Registra, organiza y analiza todo el dinero que entra a tu negocio.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl px-6 py-5 border border-[#EFE3FF] max-w-xl">
              <p className="text-sm text-gray-500">Consejo de Zeni</p>
              <p className="font-bold text-[#6D28D9] mt-1">
                Si tus ingresos dependen solo de ventas, intenta sumar servicios o preventas.
              </p>
            </div>
          </div>

          <section className="grid md:grid-cols-4 gap-6 mt-10">
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <p className="text-gray-500">Ingresos de hoy</p>
              <h2 className="text-3xl font-black text-green-500 mt-3">
                S/ {ingresosHoy.toFixed(2)}
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6">
              <p className="text-gray-500">Ingresos del mes</p>
              <h2 className="text-3xl font-black text-[#6D28D9] mt-3">
                S/ {ingresosMes.toFixed(2)}
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6">
              <p className="text-gray-500">Total acumulado</p>
              <h2 className="text-3xl font-black text-[#15142B] mt-3">
                S/ {totalIngresos.toFixed(2)}
              </h2>
            </div>

            <div className="bg-gradient-to-br from-[#6D28D9] to-[#9B00FF] rounded-3xl shadow-xl p-6 text-white">
              <p className="text-purple-100">Ingresos registrados</p>
              <h2 className="text-3xl font-black mt-3">{ingresos.length}</h2>
            </div>
          </section>

          <section className="grid lg:grid-cols-[1fr_1.2fr] gap-8 mt-10">
            <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-[#EFE3FF]">
              <h2 className="text-3xl font-black mb-6">
                {editandoId ? "Editar ingreso" : "Registrar ingreso"}
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="font-bold">Fecha</label>
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="w-full mt-2 p-4 rounded-2xl border border-[#D8C7F5]"
                  />
                </div>

                <div>
                  <label className="font-bold">Concepto</label>
                  <input
                    placeholder="Ejemplo: Venta de polos"
                    value={concepto}
                    onChange={(e) => setConcepto(e.target.value)}
                    className="w-full mt-2 p-4 rounded-2xl border border-[#D8C7F5]"
                  />
                </div>

                <div>
                  <label className="font-bold">Categoría</label>
                  <select
                    value={categoria}
                    onChange={(e) =>
                      setCategoria(e.target.value as CategoriaIngreso)
                    }
                    className="w-full mt-2 p-4 rounded-2xl border border-[#D8C7F5]"
                  >
                    {categorias.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold">Monto</label>
                  <input
                    type="number"
                    placeholder="Ejemplo: 500"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    className="w-full mt-2 p-4 rounded-2xl border border-[#D8C7F5]"
                  />
                </div>

                <div>
                  <label className="font-bold">Observación</label>
                  <textarea
                    placeholder="Opcional"
                    value={observacion}
                    onChange={(e) => setObservacion(e.target.value)}
                    className="w-full mt-2 p-4 rounded-2xl border border-[#D8C7F5] min-h-28"
                  />
                </div>

                <button
                  onClick={guardarIngreso}
                  className="w-full bg-gradient-to-r from-[#6D28D9] to-[#9B00FF] text-white py-4 rounded-2xl font-black"
                >
                  {editandoId ? "Guardar cambios" : "Guardar ingreso"}
                </button>

                {editandoId && (
                  <button
                    onClick={limpiarFormulario}
                    className="w-full bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold"
                  >
                    Cancelar edición
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-[#EFE3FF]">
              <h2 className="text-3xl font-black mb-6">Gráfico de ingresos</h2>

              <div className="h-80 flex items-end gap-4 border-b border-l border-[#E8DDF7] p-4">
                {ingresos.slice(0, 8).reverse().map((item) => (
                  <div key={item.id} className="flex-1 flex flex-col items-center justify-end">
                    <div
                      className="w-full rounded-t-2xl bg-gradient-to-t from-[#6D28D9] to-[#C084FC]"
                      style={{
                        height: `${Math.max((item.monto / mayorIngreso) * 100, 8)}%`,
                      }}
                    />
                    <p className="text-xs mt-3 text-gray-500 rotate-[-20deg]">
                      {item.categoria}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-[#F8F3FF] rounded-3xl p-6">
                <h3 className="font-black text-xl text-[#6D28D9]">
                  Lectura rápida
                </h3>

                <p className="text-gray-600 mt-2">
                  Tu ingreso acumulado es de <b>S/ {totalIngresos.toFixed(2)}</b>.
                  Mantén un registro diario para identificar qué categoría genera más dinero.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-[2rem] shadow-xl p-8 border border-[#EFE3FF] mt-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
              <div>
                <h2 className="text-3xl font-black">Historial de ingresos</h2>
                <p className="text-gray-500 mt-2">
                  Busca, filtra, edita o elimina tus registros.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <input
                  placeholder="Buscar ingreso..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="p-4 rounded-2xl border border-[#D8C7F5]"
                />

                <select
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                  className="p-4 rounded-2xl border border-[#D8C7F5]"
                >
                  <option>Todas</option>
                  {categorias.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F0E4FF] text-[#6D28D9]">
                    <th className="p-4 rounded-l-2xl">Fecha</th>
                    <th className="p-4">Concepto</th>
                    <th className="p-4">Categoría</th>
                    <th className="p-4">Monto</th>
                    <th className="p-4 rounded-r-2xl">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {ingresosFiltrados.map((ingreso) => (
                    <tr key={ingreso.id} className="border-b border-[#EFE3FF]">
                      <td className="p-4">{ingreso.fecha}</td>
                      <td className="p-4">
                        <p className="font-bold">{ingreso.concepto}</p>
                        {ingreso.observacion && (
                          <p className="text-sm text-gray-500">
                            {ingreso.observacion}
                          </p>
                        )}
                      </td>
                      <td className="p-4">{ingreso.categoria}</td>
                      <td className="p-4 font-black text-green-500">
                        S/ {ingreso.monto.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() => editarIngreso(ingreso)}
                            className="px-4 py-2 rounded-xl bg-[#F0E4FF] text-[#6D28D9] font-bold"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => eliminarIngreso(ingreso.id)}
                            className="px-4 py-2 rounded-xl bg-red-100 text-red-600 font-bold"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {ingresosFiltrados.length === 0 && (
                <p className="text-center text-gray-500 mt-8">
                  No se encontraron ingresos.
                </p>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}