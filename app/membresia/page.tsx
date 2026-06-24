export default function MembresiaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#F8F3FF] to-[#EFE4FF] p-10">
      <div className="max-w-4xl mx-auto">

        <a
          href="/cursos"
          className="text-[#6D28D9] font-bold"
        >
          ← Volver a cursos
        </a>

        <div className="bg-white rounded-3xl shadow-2xl p-10 mt-8">

          <h1 className="text-5xl font-black mb-4">
            💎 Zentry Premium
          </h1>

          <p className="text-xl text-gray-500 mb-8">
            Accede a todos los cursos y herramientas exclusivas.
          </p>

          <div className="bg-[#F8F3FF] rounded-3xl p-8 mb-8">

            <h2 className="text-6xl font-black text-[#6D28D9]">
              S/ 59.90
            </h2>

            <p className="text-gray-500 text-lg">
              Pago mensual
            </p>

          </div>

          <ul className="space-y-4 text-lg mb-10">
            <li>✅ Acceso a todos los cursos premium</li>
            <li>✅ Herramientas financieras avanzadas</li>
            <li>✅ Actualizaciones constantes</li>
            <li>✅ Plantillas exclusivas</li>
            <li>✅ Soporte prioritario</li>
          </ul>

          <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-8">

            <h3 className="text-2xl font-black mb-4">
              Paga con Yape o Plin
            </h3>

            <p className="mb-4">
              Escanea el QR y realiza el pago de:
            </p>

            <p className="text-4xl font-black text-[#6D28D9] mb-6">
              S/ 59.90
            </p>

            <div className="bg-white h-64 rounded-3xl flex items-center justify-center border-2 border-dashed">
              AQUÍ VA TU QR
            </div>

            <p className="mt-6 text-gray-500">
              Luego envía tu comprobante para activar tu cuenta Premium.
            </p>

            <button
              className="mt-6 w-full bg-gradient-to-r from-[#6D28D9] to-[#9B00FF] text-white py-4 rounded-2xl font-bold"
            >
              Ya realicé el pago
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}
