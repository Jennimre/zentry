"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  const iniciarSesion = async () => {
    try {
      await signInWithEmailAndPassword(auth, correo, password);
      setMensaje("Inicio de sesión correcto 🎉");
      router.push("/dashboard");
    } catch (error: any) {
      setMensaje(error.message);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#F8F3FF] to-[#EFE4FF] flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <a href="/" className="cursor-pointer text-[#6D28D9] font-bold">
          ← Volver al inicio
        </a>

        <h1 className="text-4xl font-black mt-6 mb-3">Iniciar sesión</h1>

        <p className="text-[#5E5878] mb-8">
          Accede a tu cuenta de Zentry.
        </p>

        <label className="font-bold">Correo electrónico</label>
        <input
          type="email"
          placeholder="ejemplo@gmail.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full mt-2 mb-5 p-4 rounded-2xl border border-[#D8C7F5]"
        />

        <label className="font-bold">Contraseña</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-2 mb-6 p-4 rounded-2xl border border-[#D8C7F5]"
        />

        <button
          onClick={iniciarSesion}
          className="w-full cursor-pointer bg-gradient-to-r from-[#6D28D9] to-[#9B00FF] text-white py-4 rounded-2xl font-bold"
        >
          Ingresar
        </button>

        {mensaje && (
          <p className="text-center mt-4 text-purple-700 font-bold">
            {mensaje}
          </p>
        )}

        <p className="text-center mt-6">
          ¿No tienes cuenta?
          <a href="/registro" className="cursor-pointer text-[#6D28D9] font-bold ml-2">
            Regístrate
          </a>
        </p>
      </div>
    </main>
  );
}