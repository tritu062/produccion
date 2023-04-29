import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "../Alert";
import logo from "../../img/logo.png";

export function ResetPass() {
  const [user, setUser] = useState({
    email: "",
  });

  const { Resetpass } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleBack = async () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!user.email) {
        setError("Por favor ingresa un email para continuar ");
      } else {
        await Resetpass(user.email);
        setError(
          "Te hemos enviado un correo electronico con un link para restablecer tu contraseña :) "
        );
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("Este correo no se encuentra registrado en el sistema");
      } else if (error.code === "auth/invalid-email") {
        setError("El correo ingresado no es valido");
      } else {
        setError(
          "Ha ocurrido un error del tipo: " +
            error.code +
            ", intentelo de nuevo o comuniquese con el administrador del sistema"
        );
      }
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
          <img src={logo} className="ml-14" alt="logo" />
          <form onSubmit={handleSubmit}>
            <h1 className="textx text-5xl font-semibold">
              Olvidaste tu Contraseña
            </h1>
            <p className="font-medium text-lg text-gray-500 mt-4">
              por favor ingresa tu correo
            </p>
            <div className="mt-8">
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                type="email"
                name="email"
                placeholder="youremail@mail.com"
                onChange={handleChange}
              />
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
              <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05] ease-in-out py-1.5 rounded-xl bg-utsb text-white text-lg font-bold">
                Enviar
              </button>
              <button
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05] ease-in-out py-1.5 rounded-xl bg-utsg text-white text-lg font-bold"
                onClick={handleBack}
              >
                Volver
              </button>
            </div>
            <p className="p-4 mt-1">{error && <Alert message={error} />}</p>
          </form>
        </div>
      </div>
      <div className="hidden lg:flex relative h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="w-60 h-60 bg-gradient-to-tr from-utsb to-utsg rounded-full animate-bounce" />
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg " />
      </div>
    </div>
  );
}
