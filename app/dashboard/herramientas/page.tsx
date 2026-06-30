"use client";

import Link from "next/link";

const herramientas = [
  {
    titulo: "Kardex",
    descripcion: "Controla entradas, salidas, stock y movimientos de inventario.",
    icono: "📦",
    ruta: "/dashboard/herramientas/kardex",
    boton: "Abrir Kardex",
  },
  {
    titulo: "Margen",
    descripcion: "Calcula cuánto ganas realmente por cada producto vendido.",
    icono: "📊",
    ruta: "/dashboard/herramientas/margen",
    boton: "Calcular margen",
  },
  {
    titulo: "Punto de Equilibrio",
    descripcion: "Descubre cuántas unidades debes vender para no perder dinero.",
    icono: "⚖️",
    ruta: "/dashboard/herramientas/punto-equilibrio",
    boton: "Calcular",
  },
  {
    titulo: "Ganancias",
    descripcion: "Analiza ingresos, costos y utilidad neta de tu negocio.",
    icono: "💰",
    ruta: "/dashboard/herramientas/ganancias",
    boton: "Ver ganancias",
  },
  {
    titulo: "Reportes",
    descripcion: "Revisa reportes de ingresos, gastos e inventario.",
    icono: "📈",
    ruta: "/dashboard/herramientas/reportes",
    boton: "Ver reportes",
  },
  {
    titulo: "Exportar",
    descripcion: "Descarga tus registros en PDF o Excel.",
    icono: "📤",
    ruta: "/dashboard/herramientas/exportar",
    boton: "Exportar",
  },
];

export default function HerramientasPage() {
  return (
    <div className="min-h-screen bg-[#F8F4FF] p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <div>
          <h1 className="text-4xl font-black text-[#1D1B3A]">
            Herramientas
          </h1>

          <p className="text-gray-600 mt-2">
            Todo lo que necesitas para administrar mejor tu negocio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {herramientas.map((item) => (
            <div
              key={item.titulo}
              className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">{item.icono}</div>

              <h2 className="text-2xl font-black text-[#1D1B3A]">
                {item.titulo}
              </h2>

              <p className="text-gray-600 mt-2 mb-5">
                {item.descripcion}
              </p>

              <Link
                href={item.ruta}
                className="inline-block bg-[#8500B8] text-white px-5 py-3 rounded-xl font-bold hover:bg-[#6f009c] transition"
              >
                {item.boton} →
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}