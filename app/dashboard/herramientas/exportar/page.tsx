"use client";

import { useState } from "react";

type TipoExportacion =
  | "ingresos"
  | "gastos"
  | "kardex"
  | "ganancias"
  | "todo";

type FormatoExportacion = "excel" | "pdf";

export default function ExportarPage() {
  const [tipo, setTipo] = useState<TipoExportacion>("todo");
  const [formato, setFormato] = useState<FormatoExportacion>("excel");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [incluirResumen, setIncluirResumen] = useState(true);
  const [incluirGraficos, setIncluirGraficos] = useState(false);

  const exportarDatos = () => {
    const datosExportacion = {
      tipo,
      formato,
      fechaInicio,
      fechaFin,
      incluirResumen,
      incluirGraficos,
      fechaExportacion: new Date().toLocaleString("es-PE"),
    };

    console.log("Exportando datos:", datosExportacion);

    alert(
      `Exportación preparada:\n\nTipo: ${tipo}\nFormato: ${formato.toUpperCase()}`
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F4FF] p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        <div>
          <h1 className="text-4xl font-black text-[#1D1B3A]">
            Exportar información
          </h1>
          <p className="text-gray-600 mt-2">
            Descarga la información de tu negocio en Excel o PDF.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 bg-white rounded-3xl shadow p-8 space-y-6">

            <div>
              <label className="block font-bold text-[#1D1B3A] mb-2">
                ¿Qué deseas exportar?
              </label>

              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoExportacion)}
                className="w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-[#8500B8]"
              >
                <option value="todo">Todo</option>
                <option value="ingresos">Ingresos</option>
                <option value="gastos">Gastos</option>
                <option value="kardex">Kardex</option>
                <option value="ganancias">Ganancias</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#1D1B3A] mb-2">
                Formato
              </label>

              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => setFormato("excel")}
                  className={`p-4 rounded-xl border font-bold transition ${
                    formato === "excel"
                      ? "bg-[#8500B8] text-white"
                      : "bg-white text-[#1D1B3A]"
                  }`}
                >
                  Excel .xlsx
                </button>

                <button
                  onClick={() => setFormato("pdf")}
                  className={`p-4 rounded-xl border font-bold transition ${
                    formato === "pdf"
                      ? "bg-[#8500B8] text-white"
                      : "bg-white text-[#1D1B3A]"
                  }`}
                >
                  PDF
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#1D1B3A] mb-2">
                  Desde
                </label>
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-[#8500B8]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1D1B3A] mb-2">
                  Hasta
                </label>
                <input
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className="w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-[#8500B8]"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={incluirResumen}
                  onChange={(e) => setIncluirResumen(e.target.checked)}
                  className="w-5 h-5"
                />
                Incluir resumen financiero
              </label>

              <label className="flex items-center gap-3 font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={incluirGraficos}
                  onChange={(e) => setIncluirGraficos(e.target.checked)}
                  className="w-5 h-5"
                />
                Incluir gráficos
              </label>
            </div>

            <button
              onClick={exportarDatos}
              className="w-full bg-[#8500B8] text-white py-4 rounded-xl font-black text-lg hover:bg-[#6f009c] transition"
            >
              Exportar información
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow p-8 space-y-5">
            <h2 className="text-2xl font-black text-[#1D1B3A]">
              Vista previa
            </h2>

            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Contenido:</strong> {tipo}
              </p>
              <p>
                <strong>Formato:</strong> {formato.toUpperCase()}
              </p>
              <p>
                <strong>Desde:</strong> {fechaInicio || "No definido"}
              </p>
              <p>
                <strong>Hasta:</strong> {fechaFin || "No definido"}
              </p>
              <p>
                <strong>Resumen:</strong>{" "}
                {incluirResumen ? "Sí" : "No"}
              </p>
              <p>
                <strong>Gráficos:</strong>{" "}
                {incluirGraficos ? "Sí" : "No"}
              </p>
            </div>

            <div className="bg-[#F8F4FF] p-5 rounded-2xl">
              <p className="text-sm text-gray-600">
                Esta sección está lista para conectarse luego con tus datos
                reales de ingresos, gastos, kardex y reportes.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="text-2xl font-black text-[#1D1B3A] mb-4">
            Últimas exportaciones
          </h2>

          <div className="space-y-3">
            <div className="p-4 bg-[#F8F4FF] rounded-xl">
              📄 Reporte_general.xlsx
            </div>
            <div className="p-4 bg-[#F8F4FF] rounded-xl">
              📄 Kardex_mensual.pdf
            </div>
            <div className="p-4 bg-[#F8F4FF] rounded-xl">
              📄 Ganancias_junio.xlsx
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}