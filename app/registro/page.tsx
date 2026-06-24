"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../../lib/firebase";

export default function RegistroPage() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [negocio, setNegocio] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const registrarUsuario = async () => {
    if (!nombre || !correo || !negocio || !password || !confirmarPassword) {
      setMensaje("Completa todos los campos.");
      return;
    }

    if (password !== confirmarPassword) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        correo,
        password
      );

      const user = userCredential.user;

      await set(ref(database, "usuarios/" + user.uid), {
        nombre: nombre,
        correo: correo,
        negocio: negocio,
        fechaRegistro: new Date().toISOString(),
      });

      setMensaje("Cuenta creada correctamente 🎉");
    } catch (error: any) {
      setMensaje(error.message);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#F8F3FF] to-[#EFE4FF] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-10">
        <a href="/" className="cursor-pointer text-[#6D28D9] font-bold">
          ← Volver al inicio
        </a>

        <h1 className="text-5xl font-black mt-6 mb-3">Crear cuenta</h1>

        <p className="text-gray-500 mb-8">
          Empieza a gestionar tus finanzas con Zentry.
        </p>

        <div className="mb-5">
          <label className="font-bold block mb-2">Nombre completo</label>
          <input
            type="text"
            placeholder="Nombre Completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-purple-600"
          />
        </div>

        <div className="mb-5">
          <label className="font-bold block mb-2">Correo electrónico</label>
          <input
            type="email"
            placeholder="correo@gmail.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-purple-600"
          />
        </div>

        <div className="mb-5">
          <label className="font-bold block mb-2">Nombre del negocio</label>
          <input
            type="text"
            placeholder="Mi Tienda Online"
            value={negocio}
            onChange={(e) => setNegocio(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-purple-600"
          />
        </div>

        <div className="mb-5">
          <label className="font-bold block mb-2">Contraseña</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-purple-600"
          />
        </div>

        <div className="mb-5">
          <label className="font-bold block mb-2">Confirmar contraseña</label>
          <input
            type="password"
            placeholder="********"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-purple-600"
          />
        </div>

        <div className="flex items-center gap-3 mb-8">
          <input type="checkbox" />
          <label>Acepto los términos y condiciones</label>
        </div>

        <button
          onClick={registrarUsuario}
          className="w-full cursor-pointer bg-gradient-to-r from-[#6D28D9] to-[#9B00FF] text-white py-4 rounded-2xl font-bold text-lg shadow-xl"
        >
          Crear cuenta
        </button>

        {mensaje && (
          <p className="text-center mt-4 text-purple-700 font-bold">
            {mensaje}
          </p>
        )}

        <p className="text-center mt-6">
          ¿Ya tienes cuenta?{" "}
          <a
            href="/login"
            className="cursor-pointer text-[#6D28D9] font-bold"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </main>
  );
}