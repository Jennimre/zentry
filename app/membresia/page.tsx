"use client";

import { useState } from "react";

type TipoPago = "mensual" | "anual";

const planes = [
  {
    nombre: "Zentsol",
    subtitulo: "Plan básico",
    mensual: 19.99,
    anual: 191.9,
    boton: "Empezar con Zentsol",
    etiqueta: "",
    destacado: false,
    beneficios: [
      "Registro diario de ingresos y gastos",
      "Resumen diario, semanal y mensual",
      "Categorías básicas",
      "Plantillas simples",
      "Kardex básico",
      "Control básico de inventario",
      "Visualización simple de ventas, gastos y ganancia",
    ],
  },
  {
    nombre: "Zen Pro",
    subtitulo: "Plan intermedio",
    mensual: 59.99,
    anual: 575.9,
    boton: "Empezar Zen Pro",
    etiqueta: "Más popular",
    destacado: true,
    beneficios: [
      "Todo lo de Zentsol",
      "Presupuesto maestro",
      "Kardex inteligente",
      "Dashboard con indicadores",
      "Gráficos interactivos",
      "Recomendaciones financieras",
      "Exportar a Excel o PDF",
      "Metas financieras",
    ],
  },
  {
    nombre: "Zen Elite",
    subtitulo: "Plan avanzado",
    mensual: 99.99,
    anual: 959.9,
    boton: "Empezar a Zen Elite",
    etiqueta: "Para negocios en crecimiento",
    destacado: false,
    beneficios: [
      "Todo lo de Zen Pro",
      "Predicción de flujo de caja",
      "Proyección de ganancias",
      "Historial financiero para futuras oportunidades de crédito",
      "Mentor financiero con IA",
      "Cursos premium",
      "Soporte prioritario",
    ],
  },
];

export default function MembresiaPage() {
  const [tipoPago, setTipoPago] = useState<TipoPago>("mensual");

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#F8F3FF] to-[#EFE4FF] px-6 py-16 text-[#15142B]">
      <div className="max-w-7xl mx-auto">
        <a href="/" className="font-bold text-[#6D28D9]">
          ← Volver al inicio
        </a>

        <h1 className="text-5xl font-black text-center mt-10">
          Elige el plan ideal para tu negocio
        </h1>

        <p className="text-center text-gray-500 text-xl mt-5 mb-10">
          Empieza gratis y mejora el control financiero de tu emprendimiento.
        </p>

        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-full shadow-lg p-2 flex gap-2 border border-[#E8DDF7]">
            <button
              onClick={() => setTipoPago("mensual")}
              className={`px-8 py-3 rounded-full font-bold transition ${
                tipoPago === "mensual"
                  ? "bg-gradient-to-r from-[#6D28D9] to-[#9B00FF] text-white"
                  : "text-[#7C3AED]"
              }`}
            >
              Mensual
            </button>

            <button
              onClick={() => setTipoPago("anual")}
              className={`px-8 py-3 rounded-full font-bold transition ${
                tipoPago === "anual"
                  ? "bg-gradient-to-r from-[#6D28D9] to-[#9B00FF] text-white"
                  : "text-[#7C3AED]"
              }`}
            >
              Anual
            </button>
          </div>
        </div>

        <p className="text-center mb-14 font-bold text-green-600">
          {tipoPago === "anual"
            ? "🎉 Ahorra 20% pagando anual"
            : "Pago mensual flexible para empezar sin compromiso."}
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {planes.map((plan) => {
            const precio =
              tipoPago === "mensual" ? plan.mensual : plan.anual;

            return (
              <div
                key={plan.nombre}
                className={`relative rounded-[2rem] p-8 shadow-xl border transition hover:-translate-y-2 ${
                  plan.destacado
                    ? "bg-gradient-to-br from-[#6D28D9] to-[#9B00FF] text-white border-[#6D28D9]"
                    : "bg-white border-[#EFE3FF]"
                }`}
              >
                {plan.etiqueta && (
                  <div
                    className={`absolute -top-5 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full text-sm font-black shadow-lg ${
                      plan.destacado
                        ? "bg-yellow-300 text-[#15142B]"
                        : "bg-[#F0E4FF] text-[#6D28D9]"
                    }`}
                  >
                    {plan.etiqueta}
                  </div>
                )}

                <h2 className="text-4xl font-black mt-4">{plan.nombre}</h2>

                <p
                  className={`font-bold mt-2 ${
                    plan.destacado ? "text-purple-100" : "text-[#6D28D9]"
                  }`}
                >
                  {plan.subtitulo}
                </p>

                <div className="mt-8">
                  <span className="text-5xl font-black">
                    S/ {precio.toFixed(2)}
                  </span>
                  <span
                    className={`ml-2 ${
                      plan.destacado ? "text-purple-100" : "text-gray-500"
                    }`}
                  >
                    / {tipoPago === "mensual" ? "mes" : "año"}
                  </span>
                </div>

                {tipoPago === "anual" && (
                  <p
                    className={`mt-3 font-bold ${
                      plan.destacado ? "text-yellow-200" : "text-green-600"
                    }`}
                  >
                    Ahorra 20%
                  </p>
                )}

                <a
                  href={`/membresia/pago?plan=${encodeURIComponent(
                    plan.nombre
                  )}&tipo=${tipoPago}&precio=${precio.toFixed(2)}`}
                  className={`block text-center mt-8 py-4 rounded-2xl font-black transition ${
                    plan.destacado
                      ? "bg-white text-[#6D28D9]"
                      : "bg-gradient-to-r from-[#6D28D9] to-[#9B00FF] text-white"
                  }`}
                >
                  {plan.boton}
                </a>

                <div className="mt-8 space-y-4">
                  {plan.beneficios.map((beneficio) => (
                    <div key={beneficio} className="flex gap-3">
                      <span
                        className={`font-black ${
                          plan.destacado ? "text-yellow-200" : "text-green-500"
                        }`}
                      >
                        ✓
                      </span>
                      <p
                        className={
                          plan.destacado ? "text-purple-50" : "text-[#5E5878]"
                        }
                      >
                        {beneficio}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}