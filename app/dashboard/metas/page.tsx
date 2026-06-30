"use client";

import { useMemo, useState } from "react";

type Meta = {
  id: number;
  nombre: string;
  categoria: string;
  montoObjetivo: number;
  montoAhorrado: number;
  fechaLimite: string;
  prioridad: "Alta" | "Media" | "Baja";
  descripcion: string;
};

const fechaHoy = () => new Date().toISOString().slice(0, 10);

export default function MetasPage() {
  const [metas, setMetas] = useState<Meta[]>([
    {
      id: 1,
      nombre: "Comprar mercadería",
      categoria: "Mercadería",
      montoObjetivo: 2000,
      montoAhorrado: 850,
      fechaLimite: "2026-07-30",
      prioridad: "Alta",
      descripcion: "Comprar más stock para vender más.",
    },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);

  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("Ahorro");
  const [montoObjetivo, setMontoObjetivo] = useState("");
  const [montoAhorrado, setMontoAhorrado] = useState("");
  const [fechaLimite, setFechaLimite] = useState(fechaHoy());
  const [prioridad, setPrioridad] = useState<"Alta" | "Media" | "Baja">("Alta");
  const [descripcion, setDescripcion] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const limpiarFormulario = () => {
    setEditandoId(null);
    setNombre("");
    setCategoria("Ahorro");
    setMontoObjetivo("");
    setMontoAhorrado("");
    setFechaLimite(fechaHoy());
    setPrioridad("Alta");
    setDescripcion("");
  };

  const guardarMeta = () => {
    if (!nombre || !montoObjetivo) {
      alert("Completa el nombre de la meta y el monto objetivo.");
      return;
    }

    const data: Meta = {
      id: editandoId ?? Date.now(),
      nombre,
      categoria,
      montoObjetivo: Number(montoObjetivo),
      montoAhorrado: Number(montoAhorrado) || 0,
      fechaLimite,
      prioridad,
      descripcion,
    };

    if (editandoId !== null) {
      setMetas(metas.map((meta) => (meta.id === editandoId ? data : meta)));
    } else {
      setMetas([data, ...metas]);
    }

    limpiarFormulario();
  };

  const editarMeta = (meta: Meta) => {
    setEditandoId(meta.id);
    setNombre(meta.nombre);
    setCategoria(meta.categoria);
    setMontoObjetivo(String(meta.montoObjetivo));
    setMontoAhorrado(String(meta.montoAhorrado));
    setFechaLimite(meta.fechaLimite);
    setPrioridad(meta.prioridad);
    setDescripcion(meta.descripcion);
  };

  const eliminarMeta = (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar esta meta?")) return;
    setMetas(metas.filter((meta) => meta.id !== id));
  };

  const metasFiltradas = metas.filter((meta) =>
    `${meta.nombre} ${meta.categoria} ${meta.prioridad} ${meta.descripcion}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const totalObjetivo = useMemo(
    () => metas.reduce((total, meta) => total + meta.montoObjetivo, 0),
    [metas]
  );

  const totalAhorrado = useMemo(
    () => metas.reduce((total, meta) => total + meta.montoAhorrado, 0),
    [metas]
  );

  const metasCumplidas = metas.filter(
    (meta) => meta.montoAhorrado >= meta.montoObjetivo
  ).length;

  const progresoGeneral =
    totalObjetivo > 0 ? Math.round((totalAhorrado / totalObjetivo) * 100) : 0;

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-5xl font-black text-[#1D1B3A]">Metas</h1>
        <p className="text-gray-500 mt-2">
          Establece objetivos financieros y controla tu avance.
        </p>
      </section>

      <section className="grid md:grid-cols-4 gap-5">
        <Card titulo="Metas activas" valor={String(metas.length)} />
        <Card titulo="Metas cumplidas" valor={String(metasCumplidas)} />
        <Card titulo="Total ahorrado" valor={`S/ ${totalAhorrado.toFixed(2)}`} />
        <Card titulo="Progreso general" valor={`${progresoGeneral}%`} morado />
      </section>

      <section className="bg-white p-8 rounded-3xl shadow">
        <h2 className="text-3xl font-black mb-6">
          {editandoId ? "Editar meta" : "Crear nueva meta"}
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label>Nombre de la meta</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej. Comprar mercadería"
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
              <option>Ahorro</option>
              <option>Mercadería</option>
              <option>Marketing</option>
              <option>Equipo para negocio</option>
              <option>Emergencia</option>
              <option>Inversión</option>
              <option>Otro</option>
            </select>
          </div>

          <div>
            <label>Monto objetivo</label>
            <input
              type="number"
              value={montoObjetivo}
              onChange={(e) => setMontoObjetivo(e.target.value)}
              placeholder="0.00"
              className="w-full border p-4 rounded-2xl mt-2"
            />
          </div>

          <div>
            <label>Monto ahorrado</label>
            <input
              type="number"
              value={montoAhorrado}
              onChange={(e) => setMontoAhorrado(e.target.value)}
              placeholder="0.00"
              className="w-full border p-4 rounded-2xl mt-2"
            />
          </div>

          <div>
            <label>Fecha límite</label>
            <input
              type="date"
              value={fechaLimite}
              onChange={(e) => setFechaLimite(e.target.value)}
              className="w-full border p-4 rounded-2xl mt-2"
            />
          </div>

          <div>
            <label>Prioridad</label>
            <select
              value={prioridad}
              onChange={(e) =>
                setPrioridad(e.target.value as "Alta" | "Media" | "Baja")
              }
              className="w-full border p-4 rounded-2xl mt-2"
            >
              <option>Alta</option>
              <option>Media</option>
              <option>Baja</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label>Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ej. Esta meta es para comprar más stock y vender más."
              className="w-full border p-4 rounded-2xl mt-2 min-h-28"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={guardarMeta}
            className="bg-[#8500B8] text-white px-8 py-4 rounded-2xl font-bold"
          >
            {editandoId ? "Guardar cambios" : "Guardar meta"}
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
          <h2 className="text-3xl font-black">Mis metas</h2>

          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar meta..."
            className="border p-4 rounded-2xl"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {metasFiltradas.map((meta) => (
            <MetaCard
              key={meta.id}
              meta={meta}
              onEditar={editarMeta}
              onEliminar={eliminarMeta}
            />
          ))}
        </div>

        {metasFiltradas.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No hay metas registradas.
          </p>
        )}
      </section>

      <section className="bg-[#F8F3FF] border border-[#E8DDF7] p-8 rounded-3xl">
        <h2 className="text-3xl font-black text-[#8500B8]">Consejo de Zeni</h2>
        <p className="text-gray-600 mt-3">
          Define metas pequeñas y medibles. Si separas una parte fija de tus
          ingresos cada semana, será más fácil cumplir tus objetivos sin afectar
          el flujo de tu negocio.
        </p>
      </section>
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
        morado ? "bg-[#8500B8] text-white" : "bg-white"
      }`}
    >
      <p className={morado ? "text-violet-100" : "text-gray-500"}>{titulo}</p>
      <h2 className="text-3xl font-bold mt-3">{valor}</h2>
    </div>
  );
}

function MetaCard({
  meta,
  onEditar,
  onEliminar,
}: {
  meta: Meta;
  onEditar: (meta: Meta) => void;
  onEliminar: (id: number) => void;
}) {
  const progreso =
    meta.montoObjetivo > 0
      ? Math.min(Math.round((meta.montoAhorrado / meta.montoObjetivo) * 100), 100)
      : 0;

  const falta = Math.max(meta.montoObjetivo - meta.montoAhorrado, 0);

  return (
    <div className="bg-[#F8F3FF] rounded-3xl p-6 border border-[#E8DDF7]">
      <div className="flex justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-[#1D1B3A]">{meta.nombre}</h3>
          <p className="text-gray-500">{meta.categoria}</p>
        </div>

        <span className="h-fit bg-white text-[#8500B8] px-3 py-1 rounded-full text-sm font-bold">
          {meta.prioridad}
        </span>
      </div>

      <div className="mt-5">
        <div className="flex justify-between text-sm mb-2">
          <span>Progreso</span>
          <span className="font-bold">{progreso}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-[#8500B8] h-3 rounded-full"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>

      <div className="space-y-2 text-sm mt-5">
        <p>Objetivo: <b>S/ {meta.montoObjetivo.toFixed(2)}</b></p>
        <p>Ahorrado: <b>S/ {meta.montoAhorrado.toFixed(2)}</b></p>
        <p>Falta: <b>S/ {falta.toFixed(2)}</b></p>
        <p>Fecha límite: <b>{meta.fechaLimite}</b></p>
      </div>

      {meta.descripcion && (
        <p className="text-sm text-gray-500 mt-4">{meta.descripcion}</p>
      )}

      <div className="flex gap-3 mt-5">
        <button
          onClick={() => onEditar(meta)}
          className="flex-1 bg-purple-100 text-purple-700 px-4 py-3 rounded-xl font-bold"
        >
          Editar
        </button>

        <button
          onClick={() => onEliminar(meta.id)}
          className="flex-1 bg-red-500 text-white px-4 py-3 rounded-xl font-bold"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}