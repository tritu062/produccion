import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "../Alert";
import logo from "../../img/logo.png";

export function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confPassword: "",
  });

  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (user.password !== user.confPassword) {
      setError("Las contraseñas ingresados no coinciden");
    } else {
      setError("");
      try {
        await signup(user.email, user.password);
        navigate("/");
      } catch (error) {
        if (error.code === "auth/invalid-email") {
          setError("El correo ingresado no es valido");
        } else if (error.code === "auth/email-already-in-use") {
          setError("El correo ingresado ya esta en uso");
        } else if (error.code === "auth/weak-password") {
          setError("La Contraseña debe contener al menos 6 caracteres");
        } else if (error.code === "auth/missing-email") {
          setError("El campo Correo es obligatorio");
        } else if (error.code === "auth/internal-error") {
          setError("El campo Contraseña es obligatorio");
        }else if (error.code === "auth/admin-restricted-operation") {
          setError("La creacion de usuarios esta actualmente deshabilitada, por favor comuniquese con el administrador del sistema");
        } else {
          setError(
            "Ha ocurrido un error del tipo: " +
              error.code +
              ", intentelo de nuevo más tarde o comuniquese con el administrador del sistema"
          );
        }
      }
    }
  };

  const handleBack = async () => {
    navigate("/login");
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
          <img src={logo} className="ml-14" alt="logo" />
          <form onSubmit={handleSubmit}>
            <h1 className="textx text-5xl font-semibold">
              Un Placer Conocerte
            </h1>
            <p className="font-medium text-lg text-gray-500 mt-4">
              por favor ingresa tus datos
            </p>
            <div className="mt-8">
              <label className="text-lg font-medium " htmlFor="Email">
                Correo
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                type="email"
                name="email"
                placeholder="youremail@mail.com"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-lg font-medium " htmlFor="password">
                Contraseña
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                type="password"
                name="password"
                id="password"
                placeholder="******"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-lg font-medium " htmlFor="confPassword">
                Confirma tu Contraseña
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                type="password"
                name="confPassword"
                id="confPassword"
                placeholder="******"
                onChange={handleChange}
              />
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
              <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05] ease-in-out py-1.5 rounded-xl bg-utsg text-white text-lg font-bold">
                Registrar
              </button>
              <button
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05] ease-in-out py-1.5 rounded-xl bg-utsb text-white text-lg font-bold"
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
