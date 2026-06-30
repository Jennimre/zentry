"use client";

import { useEffect, useMemo, useState } from "react";
import { auth, database } from "../../lib/firebase";
import { ref, get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
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
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [metaAhorro, setMetaAhorro] = useState("");

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

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

  const ingresos = useMemo(
    () =>
      movimientos
        .filter((m) => m.tipo === "ingreso")
        .reduce((total, m) => total + Number(m.monto), 0),
    [movimientos]
  );

  const gastos = useMemo(
    () =>
      movimientos
        .filter((m) => m.tipo === "gasto")
        .reduce((total, m) => total + Number(m.monto), 0),
    [movimientos]
  );

  const ganancia = ingresos - gastos;

  const porcentajeMeta =
    Number(metaAhorro) > 0
      ? Math.max(
          0,
          Math.min((Math.max(0, ganancia) / Number(metaAhorro)) * 100, 100)
        )
      : 0;

  const ultimosMovimientos = movimientos.slice(-5).reverse();

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F3FF]">
        <p className="text-2xl font-bold text-[#6D28D9]">
          Cargando Zentry...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-[2rem] shadow-xl p-8 lg:p-10 border border-[#EFE3FF]">
        <span className="inline-block bg-[#F0E4FF] text-[#6D28D9] px-5 py-3 rounded-full font-bold mb-6">
          🏠 Resumen
        </span>

        <h1 className="text-4xl lg:text-5xl font-black mb-3">
          Hola, {nombre || "emprendedora"} 👋
        </h1>

        <p className="text-xl text-gray-500">
          Bienvenida a tu dashboard financiero de Zentry.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-[#F0E4FF] p-6 rounded-3xl">
            <p className="text-gray-500">Negocio</p>
            <h2 className="text-2xl font-black text-[#6D28D9]">
              {negocio || "Mi negocio"}
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

      <section className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-[#EFE3FF]">
          <p className="text-gray-500">Ingresos</p>
          <h2 className="text-3xl font-black text-green-500 mt-2">
            S/ {ingresos.toFixed(2)}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl border border-[#EFE3FF]">
          <p className="text-gray-500">Gastos</p>
          <h2 className="text-3xl font-black text-red-400 mt-2">
            S/ {gastos.toFixed(2)}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl border border-[#EFE3FF]">
          <p className="text-gray-500">Ganancia</p>
          <h2 className="text-3xl font-black text-[#F59E0B] mt-2">
            S/ {ganancia.toFixed(2)}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-[#6D28D9] to-[#9B00FF] p-6 rounded-3xl shadow-xl text-white">
          <p className="text-purple-100">Movimientos</p>
          <h2 className="text-3xl font-black mt-2">{movimientos.length}</h2>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-[#EFE3FF]">
          <h2 className="text-3xl font-black mb-6">Resumen financiero</h2>

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

        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-[#EFE3FF]">
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

            <p className="mt-2 font-bold">{porcentajeMeta.toFixed(0)}%</p>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-[#EFE3FF]">
          <h2 className="text-3xl font-black mb-4">Consejo de Zeni</h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            {ganancia >= 0
              ? "Vas bien. Tus ingresos superan tus gastos. Mantén el registro diario para tomar mejores decisiones."
              : "Cuidado. Tus gastos superan tus ingresos. Revisa tus gastos más altos y reduce lo que no sea necesario."}
          </p>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-[#EFE3FF]">
          <h2 className="text-3xl font-black mb-6">Últimos movimientos</h2>

          {ultimosMovimientos.length === 0 ? (
            <p className="text-gray-500">
              Aún no tienes movimientos registrados.
            </p>
          ) : (
            <div className="space-y-4">
              {ultimosMovimientos.map((mov) => (
                <div
                  key={mov.id}
                  className="flex justify-between items-center p-4 bg-[#F8F3FF] rounded-2xl"
                >
                  <div>
                    <p className="font-bold">{mov.concepto}</p>
                    <p className="text-sm text-gray-500">
                      {mov.tipo} · {mov.categoria}
                    </p>
                  </div>

                  <p
                    className={
                      mov.tipo === "ingreso"
                        ? "font-black text-green-500"
                        : "font-black text-red-400"
                    }
                  >
                    S/ {Number(mov.monto).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}