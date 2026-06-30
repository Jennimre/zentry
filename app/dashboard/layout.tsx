"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Resumen", href: "/dashboard", icon: "🏠" },
  { name: "Ingresos", href: "/dashboard/ingresos", icon: "📈" },
  { name: "Gastos", href: "/dashboard/gastos", icon: "💼" },
  { name: "Metas", href: "/dashboard/metas", icon: "🎯" },
  { name: "Cursos", href: "/cursos", icon: "🎓" },
  { name: "Herramientas", href: "/dashboard/herramientas", icon: "🛠" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#F8F3FF] to-[#EFE4FF] text-[#15142B] flex">
      <aside className="w-72 min-h-screen bg-white shadow-xl p-8 flex flex-col justify-between sticky top-0">
        <div>
          <a href="/" className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6D28D9] to-[#9B00FF] text-white flex items-center justify-center text-3xl font-black">
              Z
            </div>
            <h1 className="text-3xl font-black">Zentry</h1>
          </a>

          <nav className="space-y-3 font-bold">
            {menu.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
  key={item.href}
  href={item.href}
  className={`cursor-pointer flex items-center gap-4 px-6 py-4 rounded-2xl text-xl font-bold transition ${
    active
      ? "bg-[#EBDDFF] text-[#8500B8]"
      : "text-[#15142B] hover:bg-[#F4EAFE]"
  }`}
>
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <a
          href="/login"
          className="block text-center bg-red-500 text-white py-4 rounded-2xl font-black"
        >
          Cerrar sesión
        </a>
      </aside>

      <section className="flex-1 p-8 overflow-x-hidden">
        {children}
      </section>
    </main>
  );
}