"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Zeni() {
  const [imagen, setImagen] = useState("/zeniD.png");
  const [mensaje, setMensaje] = useState("¡Hola! Soy Zeni 👋");

  const mensajes = [
    "¡Hola! Soy Zeni 👋",
    "Bienvenida a Zentry 💜",
    "¿Lista para mejorar tus finanzas? 💰",
    "Recuerda registrar tus ingresos 📈",
    "Controla tus gastos para crecer 🚀",
    "Cada ahorro te acerca a tu meta 🎯",
    "Explora nuestros cursos gratuitos 🎓",
  ];

  useEffect(() => {
    const animacion = setInterval(() => {
      setImagen((prev) =>
        prev === "/zeniD.png"
          ? "/zeniI.png"
          : "/zeniD.png"
      );
    }, 1500);

    const cambiarMensaje = setInterval(() => {
      const random =
        mensajes[Math.floor(Math.random() * mensajes.length)];

      setMensaje(random);
    }, 5000);

    return () => {
      clearInterval(animacion);
      clearInterval(cambiarMensaje);
    };
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      animate={{
        y: [0, -12, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    >
      <div className="bg-white p-4 rounded-3xl shadow-xl mb-3 max-w-xs border border-[#E8DDF7]">
        <p className="font-bold text-[#6D28D9]">
          {mensaje}
        </p>
      </div>

      <img
        src={imagen}
        alt="Zeni"
        className="w-44 drop-shadow-2xl select-none"
      />
    </motion.div>
  );
}