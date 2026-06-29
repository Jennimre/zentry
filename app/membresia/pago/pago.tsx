"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PagoPage() {
  const searchParams = useSearchParams();

  const plan = searchParams.get("plan") || "Zen Pro";
  const tipo = searchParams.get("tipo") || "mensual";
  const precio = searchParams.get("precio") || "59.99";

  const [metodo, setMetodo] = useState<"yape" | "tarjeta">("yape");

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#F8F3FF] to-[#EFE4FF] px-6 py-12 text-[#15142B]">
      <a href="/membresia" className="font-bold text-[#6D28D9]">
        ← Volver a planes
      </a>

      <section className="max-w-6xl mx-auto mt-10">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#F0E4FF] text-[#6D28D9] px-5 py-3 rounded-full font-bold">
            Pago seguro Zentry
          </span>

          <h1 className="text-5xl font-black mt-6">
            Completa tu membresía
          </h1>

          <p className="text-gray-500 text-xl mt-4">
            Elige pagar con Yape o tarjeta.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-[#EFE3FF]">
            <h2 className="text-3xl font-black mb-6">
              Resumen del pedido
            </h2>

            <div className="bg-[#F8F3FF] rounded-3xl p-6">
              <p className="text-gray-500">Plan seleccionado</p>
              <h3 className="text-4xl font-black text-[#6D28D9] mt-2">
                {plan}
              </h3>

              <p className="text-gray-500 mt-5">Modalidad</p>
              <p className="font-bold capitalize">{tipo}</p>

              <div className="mt-8 bg-gradient-to-r from-[#6D28D9] to-[#9B00FF] text-white rounded-3xl p-6">
                <p className="text-purple-100">Total a pagar</p>
                <h2 className="text-5xl font-black mt-2">
                  S/ {precio}
                </h2>
              </div>
            </div>

            <div className="mt-8 space-y-4 text-gray-600">
              <p>✅ Acceso al plan elegido</p>
              <p>✅ Activación después de validar el pago</p>
              <p>✅ Puedes pagar con Yape o tarjeta</p>
              <p>✅ Soporte de Zentry para completar tu compra</p>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-[#EFE3FF]">
            <h2 className="text-3xl font-black mb-6">
              Método de pago
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setMetodo("yape")}
                className={`p-4 rounded-2xl font-bold border transition ${
                  metodo === "yape"
                    ? "bg-[#6D28D9] text-white border-[#6D28D9]"
                    : "bg-white text-[#6D28D9] border-[#D8C7F5]"
                }`}
              >
                📱 Yape
              </button>

              <button
                onClick={() => setMetodo("tarjeta")}
                className={`p-4 rounded-2xl font-bold border transition ${
                  metodo === "tarjeta"
                    ? "bg-[#6D28D9] text-white border-[#6D28D9]"
                    : "bg-white text-[#6D28D9] border-[#D8C7F5]"
                }`}
              >
                💳 Tarjeta
              </button>
            </div>

            {metodo === "yape" ? (
              <div className="text-center">
                <div className="mx-auto w-72 h-72 rounded-3xl bg-[#F8F3FF] border-4 border-dashed border-[#6D28D9] flex items-center justify-center p-6">
                  <div>
                    <p className="text-6xl mb-4">📱</p>
                    <p className="font-black text-[#6D28D9]">
                      Aquí va tu QR de Yape
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Reemplázalo por tu imagen real
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-gray-500">
                  Escanea el QR y paga <b>S/ {precio}</b>.
                </p>

                <input
                  placeholder="Número de operación Yape"
                  className="w-full mt-6 p-4 rounded-2xl border border-[#D8C7F5]"
                />

                <button
                  onClick={() =>
                    alert("Solicitud enviada. Validaremos tu pago 💜")
                  }
                  className="mt-6 w-full bg-gradient-to-r from-[#6D28D9] to-[#9B00FF] text-white py-4 rounded-2xl font-black"
                >
                  Ya pagué por Yape
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <input
                  placeholder="Número de tarjeta"
                  className="w-full p-4 rounded-2xl border border-[#D8C7F5]"
                />

                <input
                  placeholder="Nombre del titular"
                  className="w-full p-4 rounded-2xl border border-[#D8C7F5]"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="MM/AA"
                    className="w-full p-4 rounded-2xl border border-[#D8C7F5]"
                  />

                  <input
                    placeholder="CVV"
                    className="w-full p-4 rounded-2xl border border-[#D8C7F5]"
                  />
                </div>

                <button
                  onClick={() =>
                    alert("Pago procesado correctamente 💜")
                  }
                  className="w-full bg-gradient-to-r from-[#6D28D9] to-[#9B00FF] text-white py-4 rounded-2xl font-black"
                >
                  Pagar ahora
                </button>

                <p className="text-sm text-gray-500 text-center">
                  Esta pantalla es visual. Para cobros reales se conecta con Culqi,
                  Mercado Pago, Izipay o Stripe.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}