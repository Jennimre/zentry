export default function Cursos() {
  const cursos = [
    {
      icono: "💰",
      titulo: "Finanzas básicas",
      descripcion: "Aprende conceptos simples para manejar tu dinero.",
      categoria: "Finanzas personales",
      premium: false,
      video: "https://www.youtube.com/embed/29iU2NA0rDQ",
    },
    {
      icono: "📊",
      titulo: "Control de gastos",
      descripcion: "Registra y analiza en qué se va tu dinero.",
      categoria: "Finanzas personales",
      premium: false,
      video: "https://www.youtube.com/embed/3_6vbu7H9Z0",
    },
    {
      icono: "📈",
      titulo: "Presupuesto mensual",
      descripcion: "Organiza ingresos, gastos y metas.",
      categoria: "Finanzas personales",
      premium: false,
      video: "https://www.youtube.com/embed/f2O4Q-T12FI",
    },
    {
      icono: "🎯",
      titulo: "Metas de ahorro",
      descripcion: "Crea objetivos y mide tu avance.",
      categoria: "Ahorro",
      premium: false,
      video: "https://www.youtube.com/embed/zn_rA50QqyA",
    },
    {
      icono: "💳",
      titulo: "Uso responsable de tarjetas",
      descripcion: "Evita deudas innecesarias y controla tus pagos.",
      categoria: "Finanzas personales",
      premium: false,
      video: "https://www.youtube.com/embed/_zMTIagFDzs",
    },
    {
      icono: "📚",
      titulo: "Educación financiera para jóvenes",
      descripcion: "Aprende a tomar mejores decisiones desde temprano.",
      categoria: "Finanzas personales",
      premium: false,
      video: "https://www.youtube.com/embed/X38MGyuc0ds",
    },
    {
      icono: "🧮",
      titulo: "Calculadora de ganancias",
      descripcion: "Aprende a calcular ingresos, gastos y utilidad.",
      categoria: "Herramientas",
      premium: false,
      video: "https://www.youtube.com/embed/dGEc1qMFttQ",
    },
    {
      icono: "💼",
      titulo: "Separar dinero personal y negocio",
      descripcion: "Evita mezclar tus finanzas personales con tu emprendimiento.",
      categoria: "Gestión",
      premium: false,
      video: "https://www.youtube.com/embed/wzfOchVqBAw",
    },

    {
      icono: "🏪",
      titulo: "Costos para emprendedores",
      descripcion: "Calcula costos, ganancias y precios.",
      categoria: "Emprendimiento",
      premium: true,
      video: "https://www.youtube.com/embed/WF6qLnuh4EA",
    },
    {
      icono: "🧾",
      titulo: "Cómo fijar precios",
      descripcion: "Aprende a poner precios sin perder dinero.",
      categoria: "Emprendimiento",
      premium: true,
      video: "https://www.youtube.com/embed/i-lYQBZ2wBI",
    },
    {
      icono: "🚀",
      titulo: "Ventas y rentabilidad",
      descripcion: "Mejora tus decisiones para crecer.",
      categoria: "Ventas",
      premium: true,
      video: "https://www.youtube.com/embed/GefRR-P5kkM",
    },
    {
      icono: "📦",
      titulo: "Inventario básico",
      descripcion: "Controla entradas, salidas y stock de productos.",
      categoria: "Gestión",
      premium: true,
      video: "https://www.youtube.com/embed/ZJYBd1pZJZY",
    },
    {
      icono: "📉",
      titulo: "Punto de equilibrio",
      descripcion: "Calcula cuánto debes vender para no perder.",
      categoria: "Costos",
      premium: true,
      video: "https://www.youtube.com/embed/H3VblR2kLXM",
    },
    {
      icono: "🏷️",
      titulo: "Margen de ganancia",
      descripcion: "Aprende a calcular margen, utilidad y rentabilidad.",
      categoria: "Costos",
      premium: true,
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      icono: "🛒",
      titulo: "Ventas por redes sociales",
      descripcion: "Organiza tu negocio en Instagram, TikTok y WhatsApp.",
      categoria: "Marketing",
      premium: true,
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      icono: "📱",
      titulo: "Marketing para emprendedores",
      descripcion: "Aprende estrategias simples para vender más.",
      categoria: "Marketing",
      premium: true,
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      icono: "🏦",
      titulo: "Ahorro e inversión inicial",
      descripcion: "Conoce las bases para empezar a invertir.",
      categoria: "Inversión",
      premium: true,
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      icono: "🧠",
      titulo: "Mentalidad financiera",
      descripcion: "Cambia hábitos para mejorar tu relación con el dinero.",
      categoria: "Crecimiento",
      premium: true,
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      icono: "👩‍💼",
      titulo: "Formalización de negocio",
      descripcion: "Conoce pasos básicos para formalizar tu emprendimiento.",
      categoria: "Negocios",
      premium: true,
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      icono: "📋",
      titulo: "Plan financiero simple",
      descripcion: "Crea un plan mensual para ordenar tu negocio.",
      categoria: "Gestión",
      premium: true,
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      icono: "📆",
      titulo: "Flujo de caja mensual",
      descripcion: "Aprende a proyectar entradas y salidas de dinero.",
      categoria: "Finanzas empresariales",
      premium: true,
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      icono: "🧵",
      titulo: "Costos para negocios textiles",
      descripcion: "Calcula tela, mano de obra, etiquetas y empaque.",
      categoria: "Textil",
      premium: true,
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      icono: "📢",
      titulo: "Promociones y descuentos",
      descripcion: "Aprende a hacer ofertas sin perder rentabilidad.",
      categoria: "Ventas",
      premium: true,
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      icono: "📊",
      titulo: "Indicadores para emprendedores",
      descripcion: "Aprende a leer ventas, margen, gastos y crecimiento.",
      categoria: "Análisis",
      premium: true,
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  const tieneMembresia = false;

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#F8F3FF] to-[#EFE4FF] text-[#15142B] p-10">
      <a href="/dashboard" className="cursor-pointer text-[#6D28D9] font-bold">
        ← Volver al dashboard
      </a>

      <h1 className="text-5xl font-black mt-8 mb-4">Cursos Zentry</h1>

      <p className="text-xl text-[#5E5878] mb-10">
        Aprende educación financiera con cursos gratuitos y premium.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {cursos.map((curso) => {
          const bloqueado = curso.premium && !tieneMembresia;

          return (
            <div
              key={curso.titulo}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-[#F0E4FF] flex items-center justify-center text-4xl">
                  {curso.icono}
                </div>

                {curso.premium ? (
                  <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold text-sm">
                    Premium
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm">
                    Gratis
                  </span>
                )}
              </div>

              <p className="text-sm font-bold text-[#6D28D9] mb-2">
                {curso.categoria}
              </p>

              <h2 className="text-2xl font-black mb-3">{curso.titulo}</h2>

              <p className="text-[#5E5878] mb-6">{curso.descripcion}</p>

              {bloqueado ? (
                <div className="bg-[#F8F3FF] rounded-2xl p-6 text-center">
                  <p className="text-5xl mb-3">🔒</p>
                  <p className="font-bold mb-4">
                    Este curso está disponible solo con membresía.
                  </p>

                  <a
                    href="/membresia"
                    className="inline-block cursor-pointer bg-gradient-to-r from-[#6D28D9] to-[#9B00FF] text-white px-6 py-3 rounded-2xl font-bold"
                  >
                    Obtener membresía
                  </a>
                </div>
              ) : (
                <div>
                  <iframe
                    className="w-full rounded-2xl"
                    height="220"
                    src={curso.video}
                    title={curso.titulo}
                    allowFullScreen
                  />

                  <button className="mt-5 w-full cursor-pointer bg-gradient-to-r from-[#6D28D9] to-[#9B00FF] text-white px-6 py-3 rounded-2xl font-bold">
                    Ver curso
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}