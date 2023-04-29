import React from "react";
import { useAuth } from "../../context/authContext";
import "./Button.css";

function Button() {
    const { logout } = useAuth();
    const handelLogUot = async () => {
        await logout();
    };
    return (
        <button className="btnn" onClick={handelLogUot} >Cerrar Sesión</button>
    );
}

export default Button;
