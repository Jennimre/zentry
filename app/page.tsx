import Zeni from "@/components/zeni";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#F8F3FF] to-[#EFE4FF] text-[#15142B] overflow-hidden font-[Poppins]">
      <nav className="flex items-center justify-between px-8 py-6">
        <a href="/" className="flex items-center gap-4 cursor-pointer">
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#6D28D9] to-[#9B00FF] text-white flex items-center justify-center text-4xl font-black shadow-xl">
            Z
            <span className="absolute -top-1 -left-1 text-[#8A2BE2] text-xl">✦</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight">Zentry</h1>
        </a>

        <div className="hidden md:flex gap-12 font-bold">
          <a href="#nosotros" className="cursor-pointer text-[#6D28D9] border-b-4 border-[#6D28D9] pb-3">
            Nosotros
          </a>
          <a href="/cursos" className="cursor-pointer hover:text-[#6D28D9]">
            Cursos
          </a>
          <a href="/dashboard" className="cursor-pointer hover:text-[#6D28D9]">
            Herramientas
          </a>
          <a href="/membresia" className="cursor-pointer hover:text-[#6D28D9]">
            Precios
          </a>
        </div>

        <div className="flex gap-6 items-center">
          <a href="/login" className="cursor-pointer font-bold hover:text-[#6D28D9]">
            Iniciar sesión
          </a>

          <a
            href="/membresia/pago"
            className="cursor-pointer bg-gradient-to-r from-[#6D28D9] to-[#9B00FF] text-white px-8 py-4 rounded-2xl font-bold shadow-xl"
          >
            Comenzar Gratis →
          </a>
        </div>
      </nav>

      <section id="nosotros" className="grid lg:grid-cols-2 gap-10 px-10 py-16 items-center">
        <div>
          <span className="bg-[#F0E4FF] text-[#6D28D9] px-5 py-3 rounded-full font-bold inline-block mb-8">
            ✦ Para emprendedores que quieren crecer
          </span>

          <h2 className="text-6xl md:text-7xl font-black leading-tight tracking-tight">
            Finanzas claras, mejores decisiones,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] to-[#9B00FF]">
              negocios que crecen.
            </span>
          </h2>

          <p className="text-2xl text-[#5E5878] mt-8 leading-relaxed">
            Controla ingresos, gastos, metas y cursos financieros en un solo lugar.
          </p>

          <div className="flex gap-6 mt-10">
            <a
              href="/membresia"
              className="cursor-pointer bg-gradient-to-r from-[#6D28D9] to-[#9B00FF] text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl"
            >
              Comenzar Gratis →
            </a>

            <a
              href="/dashboard"
              className="cursor-pointer bg-white border border-[#D8C7F5] px-10 py-5 rounded-2xl font-bold text-lg shadow"
            >
              ▶ Ver Demo
            </a>
          </div>

          <div className="flex items-center gap-6 mt-12">
            <div className="flex -space-x-4">
              {["👨🏻", "👩🏻", "👨🏽", "👩🏽"].map((x) => (
                <div
                  key={x}
                  className="w-14 h-14 rounded-full bg-white shadow flex items-center justify-center text-3xl border-2 border-white"
                >
                  {x}
                </div>
              ))}
            </div>

            <div className="border-l pl-6">
              <p className="text-yellow-400 text-2xl">★★★★★</p>
              <p className="font-bold text-lg">+500 emprendedores</p>
              <p className="text-[#5E5878]">confían en Zentry</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-10 left-20 w-96 h-96 bg-[#D8B4FE] rounded-full blur-3xl opacity-40"></div>

          <div className="relative bg-white rounded-[2rem] shadow-2xl p-8 grid grid-cols-[180px_1fr] gap-6 border border-[#EFE3FF]">
            <aside className="border-r pr-6">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-11 h-11 rounded-full bg-[#6D28D9] text-white flex items-center justify-center font-bold">
                  Z
                </div>
                <b className="text-xl">Zentry</b>
              </div>

              <a href="/dashboard" className="block p-4 rounded-xl mb-3 font-medium bg-[#F0E4FF] text-[#6D28D9]">
                🏠 Resumen
              </a>
              <a href="/dashboard" className="block p-4 rounded-xl mb-3 font-medium">
                📈 Ingresos
              </a>
              <a href="/dashboard" className="block p-4 rounded-xl mb-3 font-medium">
                💼 Gastos
              </a>
              <a href="/dashboard" className="block p-4 rounded-xl mb-3 font-medium">
                🎯 Metas
              </a>
              <a href="/cursos" className="block p-4 rounded-xl mb-3 font-medium">
                🎓 Cursos
              </a>
              <a href="/dashboard" className="block p-4 rounded-xl mb-3 font-medium">
                ▦ Herramientas
              </a>
            </aside>

            <section>
              <div className="flex justify-between mb-8">
                <h3 className="text-2xl font-black tracking-tight">Resumen</h3>
                <a href="/dashboard" className="border px-4 py-2 rounded-xl">
                  Este mes⌄
                </a>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="bg-gradient-to-br from-[#6D28D9] to-[#9B00FF] text-white p-6 rounded-2xl">
                  <p>Ganancias del mes</p>
                  <h4 className="text-4xl font-black mt-3">S/ 3,240</h4>
                  <p className="mt-4">↑ 12% vs. mes anterior</p>
                </div>

                <div className="bg-white shadow p-6 rounded-2xl">
                  <p>Ingresos</p>
                  <h4 className="text-3xl font-black mt-3">S/ 8,500</h4>
                  <p className="text-green-500 text-4xl mt-5">⌁⌁⌁</p>
                </div>

                <div className="bg-white shadow p-6 rounded-2xl">
                  <p>Gastos</p>
                  <h4 className="text-3xl font-black mt-3">S/ 5,260</h4>
                  <p className="text-red-400 text-4xl mt-5">⌁⌁⌁</p>
                </div>

                <div className="bg-white shadow p-6 rounded-2xl">
                  <p>Margen de ganancia</p>
                  <h4 className="text-3xl font-black mt-3">38%</h4>
                  <div className="w-20 h-20 rounded-full border-[14px] border-[#6D28D9] border-t-[#E8DDF7] mt-4"></div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex justify-between font-bold">
                  <p>Meta de ahorro</p>
                  <p>65%</p>
                </div>

                <div className="h-3 bg-[#E8DDF7] rounded-full mt-3">
                  <div className="h-3 bg-[#6D28D9] rounded-full w-[65%]"></div>
                </div>

                <div className="mt-8 h-24 flex items-end gap-3">
                  {[30, 45, 35, 60, 50, 75, 65, 88].map((h, i) => (
                    <div
                      key={i}
                      className="w-full bg-gradient-to-t from-[#6D28D9] to-[#C084FC] rounded-t-xl"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="absolute -right-8 top-10 bg-white p-6 rounded-3xl shadow-xl">
            <p>🟢 Tus ganancias</p>
            <p>
              aumentaron <b className="text-green-500">12%</b>
            </p>
          </div>

          <div className="absolute -right-10 bottom-44 bg-white p-6 rounded-3xl shadow-xl">
            <p>🎯 Meta de ahorro</p>
            <p>65% completada</p>
          </div>

          <div className="absolute right-2 -bottom-12 text-center">
            <div className="text-9xl">🦙</div>
            <p className="font-black text-[#6D28D9]">Zeni</p>
          </div>
        </div>
      </section>

      <section className="mx-10 mb-10 bg-white rounded-3xl shadow-xl p-8 grid md:grid-cols-4 gap-8">
        {[
          ["💼", "Controla", "tus finanzas"],
          ["🎓", "Aprende", "a tu ritmo"],
          ["🎯", "Ahorra", "para tus metas"],
          ["📈", "Haz crecer", "tu negocio"],
        ].map(([icon, title, text]) => (
          <div key={title} className="flex items-center gap-5 border-r last:border-r-0">
            <div className="w-20 h-20 rounded-full bg-[#F0E4FF] flex items-center justify-center text-4xl">
              {icon}
            </div>
            <div>
              <h3 className="font-black text-xl">{title}</h3>
              <p className="text-[#5E5878] text-lg">{text}</p>
            </div>
          </div>
        ))}
      </section>

{/* NOSOTROS */}

<section
  id="nosotros"
  className="mx-10 my-20 bg-white rounded-3xl shadow-xl p-12"
>
  <div className="text-center mb-10">
    <h2 className="text-5xl font-black text-[#6D28D9]">
      Nosotros
    </h2>

    <p className="text-xl text-[#5E5878] mt-4">
      Conoce quiénes están detrás de Zentry.
    </p>
  </div>

  <div className="max-w-4xl mx-auto text-center">
    <p className="text-lg text-[#5E5878] leading-relaxed">
      Somos estudiantes universitarios comprometidos con la educación financiera
      y el emprendimiento. Creamos <b>Zentry</b> para ayudar a jóvenes,
      emprendedores y pequeños negocios a gestionar mejor sus finanzas mediante
      herramientas simples, cursos prácticos y recursos accesibles.
    </p>

    <p className="text-lg text-[#5E5878] leading-relaxed mt-6">
      Sabemos que muchas personas tienen dificultades para controlar sus
      ingresos, gastos y metas financieras. Por ello desarrollamos una
      plataforma intuitiva que permite aprender, organizar y tomar mejores
      decisiones económicas de manera sencilla.
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-8 mt-12">
    <div className="bg-[#F8F3FF] p-6 rounded-2xl">
      <h3 className="font-black text-2xl mb-3">🎯 Misión</h3>
      <p>
        Brindar educación financiera accesible y práctica para todos.
      </p>
    </div>

    <div className="bg-[#F8F3FF] p-6 rounded-2xl">
      <h3 className="font-black text-2xl mb-3">🚀 Visión</h3>
      <p>
        Ser la plataforma financiera favorita de emprendedores en Latinoamérica.
      </p>
    </div>

    <div className="bg-[#F8F3FF] p-6 rounded-2xl">
      <h3 className="font-black text-2xl mb-3">💜 Valores</h3>
      <p>
        Innovación, educación, transparencia y crecimiento continuo.
      </p>
    </div>
  </div>
</section>

<Zeni />
      
      <Zeni />
    </main>
  );
}