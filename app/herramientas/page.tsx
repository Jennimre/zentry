export default function HerramientasPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#F8F3FF] to-[#EFE4FF] p-10 text-[#15142B]">
      <a href="/dashboard" className="text-[#6D28D9] font-bold">
        ← Volver al dashboard
      </a>

      <h1 className="text-5xl font-black mt-8 mb-4">
        Herramientas Zentry
      </h1>

      <p className="text-xl text-gray-500 mb-10">
        Usa herramientas financieras para gestionar mejor tu negocio.
      </p>

      <div className="grid md:grid-cols-3 gap-8">

        <a
          href="/herramientas/kardex"
          className="bg-white p-8 rounded-3xl shadow-xl hover:scale-105 transition"
        >
          <div className="text-5xl mb-5">📦</div>

          <h2 className="text-2xl font-black mb-3">
            Kardex Automático
          </h2>

          <p className="text-gray-500">
            Controla entradas, salidas y costo promedio ponderado.
          </p>
        </a>

      </div>
    </main>
  );
}