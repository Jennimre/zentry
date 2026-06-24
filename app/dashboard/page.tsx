"use client";

import { useEffect, useState } from "react";
import { auth, database } from "../../lib/firebase";
import { ref, get, push, set, remove } from "firebase/database";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type Movimiento = {
  id: string;
  concepto: string;
  monto: number;
  tipo: "ingreso" | "gasto";
  categoria: string;
  fecha: string;
};

export default function DashboardPage() {
  const [nombre, setNombre] = useState("");
  const [negocio, setNegocio] = useState("");
  const [correo, setCorreo] = useState("");
  const [cargando, setCargando] = useState(true);
  const [uid, setUid] = useState("");

  const [concepto, setConcepto] = useState("");
  const [monto, setMonto] = useState("");
  const [tipo, setTipo] = useState<"ingreso" | "gasto">("ingreso");
  const [categoria, setCategoria] = useState("");
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [metaAhorro, setMetaAhorro] = useState("");

  const [editandoId, setEditandoId] = useState("");
  const [editConcepto, setEditConcepto] = useState("");
  const [editMonto, setEditMonto] = useState("");

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      setUid(user.uid);

      const userRef = ref(database, "usuarios/" + user.uid);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        setNombre(data.nombre || "");
        setNegocio(data.negocio || "");
        setCorreo(data.correo || user.email || "");
      } else {
        setCorreo(user.email || "");
      }

      const movimientosRef = ref(database, "movimientos/" + user.uid);
      const movimientosSnapshot = await get(movimientosRef);

      if (movimientosSnapshot.exists()) {
        const data = movimientosSnapshot.val();

        const lista = Object.entries(data).map(([id, mov]: any) => ({
          id,
          ...mov,
        })) as Movimiento[];

        setMovimientos(lista);
      }

      setCargando(false);
    });

    return () => unsubscribe();
  }, [router]);

  const ingresos = movimientos
    .filter((m) => m.tipo === "ingreso")
    .reduce((total, m) => total + Number(m.monto), 0);

  const gastos = movimientos
    .filter((m) => m.tipo === "gasto")
    .reduce((total, m) => total + Number(m.monto), 0);

  const ganancia = ingresos - gastos;

  const porcentajeMeta =
    Number(metaAhorro) > 0
      ? Math.max(0, Math.min((ganancia / Number(metaAhorro)) * 100, 100))
      : 0;

  const guardarMovimiento = async () => {
    if (!concepto || !monto || !categoria) {
      setMensaje("Completa el concepto, monto y categoría.");
      return;
    }

    if (!uid) {
      setMensaje("No se encontró el usuario.");
      return;
    }

    const movimientosRef = ref(database, "movimientos/" + uid);
    const nuevoRef = push(movimientosRef);

    const nuevoMovimiento: Movimiento = {
      id: nuevoRef.key || "",
      concepto,
      monto: Number(monto),
      tipo,
      categoria,
      fecha: new Date().toISOString(),
    };

    await set(nuevoRef, nuevoMovimiento);

    setMovimientos([...movimientos, nuevoMovimiento]);
    setConcepto("");
    setMonto("");
    setTipo("ingreso");
    setCategoria("");
    setMensaje("Movimiento guardado correctamente 🎉");
  };

  const eliminarMovimiento = async (id: string) => {
    if (!uid) return;

    await remove(ref(database, "movimientos/" + uid + "/" + id));
    setMovimientos(movimientos.filter((mov) => mov.id !== id));
  };

  const iniciarEdicion = (mov: Movimiento) => {
    setEditandoId(mov.id);
    setEditConcepto(mov.concepto);
    setEditMonto(String(mov.monto));
  };

  const guardarEdicion = async (mov: Movimiento) => {
    if (!uid) return;

    const movimientoActualizado: Movimiento = {
      ...mov,
      concepto: editConcepto,
      monto: Number(editMonto),
    };

    await set(
      ref(database, "movimientos/" + uid + "/" + mov.id),
      movimientoActualizado
    );

    setMovimientos(
      movimientos.map((m) =>
        m.id === mov.id ? movimientoActualizado : m
      )
    );

    setEditandoId("");
    setEditConcepto("");
    setEditMonto("");
  };

  const cerrarSesion = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (cargando) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F8F3FF]">
        <p className="text-2xl font-bold text-[#6D28D9]">
          Cargando Zentry...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#F8F3FF] to-[#EFE4FF] text-[#15142B]">
      <div className="grid md:grid-cols-[260px_1fr]">
        <aside className="bg-white min-h-screen p-8 shadow-xl sticky top-0">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6D28D9] to-[#9B00FF] text-white flex items-center justify-center font-black text-xl">
              Z
            </div>
            <h1 className="text-2xl font-black">Zentry</h1>
          </div>

          <nav className="space-y-3 font-bold">
            <a href="#resumen" className="block cursor-pointer p-3 rounded-xl hover:bg-[#F0E4FF]">
              🏠 Resumen
            </a>
            <a href="#ingresos" className="block cursor-pointer p-3 rounded-xl hover:bg-[#F0E4FF]">
              📈 Ingresos
            </a>
            <a href="#gastos" className="block cursor-pointer p-3 rounded-xl hover:bg-[#F0E4FF]">
              💼 Gastos
            </a>
            <a href="#metas" className="block cursor-pointer p-3 rounded-xl hover:bg-[#F0E4FF]">
              🎯 Metas
            </a>
            <a href="/cursos" className="block cursor-pointer p-3 rounded-xl hover:bg-[#F0E4FF]">
              🎓 Cursos
            </a>
            <a href="#herramientas" className="block cursor-pointer p-3 rounded-xl hover:bg-[#F0E4FF]">
              ▦ Herramientas
            </a>
          </nav>

          <button
            onClick={cerrarSesion}
            className="mt-10 w-full cursor-pointer bg-red-500 text-white py-3 rounded-2xl font-bold"
          >
            Cerrar sesión
          </button>
        </aside>

        <section className="p-10">
          <section id="resumen" className="bg-white rounded-3xl shadow-xl p-10">
            <h1 className="text-5xl font-black mb-3">
              Hola {nombre || "emprendedora"} 👋
            </h1>

            <p className="text-xl text-gray-500">
              Bienvenida a tu dashboard financiero de Zentry.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div className="bg-[#F0E4FF] p-6 rounded-3xl">
                <p className="text-gray-500">Negocio</p>
                <h2 className="text-3xl font-black text-[#6D28D9]">
                  {negocio}
                </h2>
              </div>

              <div className="bg-[#F0E4FF] p-6 rounded-3xl">
                <p className="text-gray-500">Correo</p>
                <h2 className="text-xl font-bold break-words">{correo}</h2>
              </div>

              <div className="bg-[#F0E4FF] p-6 rounded-3xl">
                <p className="text-gray-500">Estado</p>
                <h2 className="text-3xl font-black text-green-500">Activo</h2>
              </div>
            </div>
          </section>

          <section className="grid md:grid-cols-4 gap-6 mt-8">
            <div id="ingresos" className="bg-white p-6 rounded-3xl shadow-xl">
              <p className="text-gray-500">Ingresos</p>
              <h2 className="text-3xl font-black text-green-500">
                S/ {ingresos.toFixed(2)}
              </h2>
            </div>

            <div id="gastos" className="bg-white p-6 rounded-3xl shadow-xl">
              <p className="text-gray-500">Gastos</p>
              <h2 className="text-3xl font-black text-red-400">
                S/ {gastos.toFixed(2)}
              </h2>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-xl">
              <p className="text-gray-500">Ganancia</p>
              <h2 className="text-3xl font-black text-[#F59E0B]">
                S/ {ganancia.toFixed(2)}
              </h2>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-xl">
              <p className="text-gray-500">Movimientos</p>
              <h2 className="text-3xl font-black">{movimientos.length}</h2>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <h2 className="text-3xl font-black mb-6">
                Resumen financiero
              </h2>

              <div style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer>
                  <BarChart
                    data={[
                      { nombre: "Ingresos", monto: ingresos },
                      { nombre: "Gastos", monto: gastos },
                      { nombre: "Ganancia", monto: ganancia },
                    ]}
                  >
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="monto">
                      <Cell fill="#22C55E" />
                      <Cell fill="#EF4444" />
                      <Cell fill="#F59E0B" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div id="metas" className="bg-white p-8 rounded-3xl shadow-xl">
              <h2 className="text-3xl font-black mb-6">Meta de ahorro</h2>

              <input
                type="number"
                placeholder="Ejemplo: 1000"
                value={metaAhorro}
                onChange={(e) => setMetaAhorro(e.target.value)}
                className="w-full p-4 rounded-2xl border border-[#D8C7F5]"
              />

              <div className="mt-6">
                <p className="font-bold">Meta: S/ {metaAhorro || "0"}</p>

                <p className="font-bold text-green-500">
                  Ahorrado: S/ {Math.max(0, ganancia).toFixed(2)}
                </p>

                <div className="w-full bg-gray-200 h-5 rounded-full mt-4">
                  <div
                    className="bg-green-500 h-5 rounded-full"
                    style={{ width: `${porcentajeMeta}%` }}
                  />
                </div>

                <p className="mt-2 font-bold">
                  {porcentajeMeta.toFixed(0)}%
                </p>
              </div>
            </div>
          </section>

          <section id="herramientas" className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <h2 className="text-3xl font-black mb-6">
                Registrar movimiento
              </h2>

              <label className="font-bold">Concepto</label>
              <input
                value={concepto}
                onChange={(e) => setConcepto(e.target.value)}
                placeholder="Ejemplo: Venta de polos"
                className="w-full mt-2 mb-5 p-4 rounded-2xl border border-[#D8C7F5]"
              />

              <label className="font-bold">Monto</label>
              <input
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                type="number"
                placeholder="Ejemplo: 500"
                className="w-full mt-2 mb-5 p-4 rounded-2xl border border-[#D8C7F5]"
              />

              <label className="font-bold">Tipo</label>
              <select
                value={tipo}
                onChange={(e) => {
                  setTipo(e.target.value as "ingreso" | "gasto");
                  setCategoria("");
                }}
                className="w-full mt-2 mb-6 p-4 rounded-2xl border border-[#D8C7F5]"
              >
                <option value="ingreso">Ingreso</option>
                <option value="gasto">Gasto</option>
              </select>

              <label className="font-bold">Categoría</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full mt-2 mb-6 p-4 rounded-2xl border border-[#D8C7F5]"
              >
                <option value="">Selecciona una categoría</option>

                {tipo === "ingreso" ? (
                  <>
                    <option value="Ventas">Ventas</option>
                    <option value="Servicios">Servicios</option>
                    <option value="Otros ingresos">Otros ingresos</option>
                  </>
                ) : (
                  <>
                    <option value="Tela">Tela</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Personal">Personal</option>
                    <option value="Otros gastos">Otros gastos</option>
                  </>
                )}
              </select>

              <button
                onClick={guardarMovimiento}
                className="w-full cursor-pointer bg-gradient-to-r from-[#6D28D9] to-[#9B00FF] text-white py-4 rounded-2xl font-bold"
              >
                Guardar movimiento
              </button>

              {mensaje && (
                <p className="text-center mt-4 text-purple-700 font-bold">
                  {mensaje}
                </p>
              )}
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <h2 className="text-3xl font-black mb-6">
                Últimos movimientos
              </h2>

              {movimientos.length === 0 ? (
                <p className="text-gray-500">
                  Aún no tienes movimientos registrados.
                </p>
              ) : (
                <div className="space-y-4">
                  {movimientos.slice(-5).reverse().map((mov) => (
                    <div
                      key={mov.id}
                      className="p-4 bg-[#F8F3FF] rounded-2xl"
                    >
                      {editandoId === mov.id ? (
                        <div>
                          <input
                            value={editConcepto}
                            onChange={(e) => setEditConcepto(e.target.value)}
                            className="w-full mb-3 p-3 rounded-xl border"
                          />

                          <input
                            value={editMonto}
                            onChange={(e) => setEditMonto(e.target.value)}
                            type="number"
                            className="w-full mb-3 p-3 rounded-xl border"
                          />

                          <div className="flex gap-3">
                            <button
                              onClick={() => guardarEdicion(mov)}
                              className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded-xl font-bold"
                            >
                              Guardar
                            </button>

                            <button
                              onClick={() => setEditandoId("")}
                              className="cursor-pointer bg-gray-300 px-4 py-2 rounded-xl font-bold"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-bold">{mov.concepto}</p>
                            <p className="text-sm text-gray-500">
                              {mov.tipo} · {mov.categoria}
                            </p>
                          </div>

                          <div className="text-right">
                            <p
                              className={
                                mov.tipo === "ingreso"
                                  ? "font-black text-green-500"
                                  : "font-black text-red-400"
                              }
                            >
                              S/ {Number(mov.monto).toFixed(2)}
                            </p>

                            <button
                              onClick={() => iniciarEdicion(mov)}
                              className="cursor-pointer text-blue-500 text-sm font-bold mt-2 mr-3"
                            >
                              Editar
                            </button>

                            <button
                              onClick={() => eliminarMovimiento(mov.id)}
                              className="cursor-pointer text-red-500 text-sm font-bold mt-2"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}