import React, { useEffect } from "react";
import { useState } from "react";
import MUIDataTable from "mui-datatables";
import control from "../../img/assets/control.png";
import Chart from "../../img/assets/Chart.png";
import Search from "../../img//assets/Search.png";
import User from "../../img//assets/User.png";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import folder from "../../img/assets/Folder.png";
import logo from "../../img/logo.png";
import { Alert } from "../Alert";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";

export function AcceseToMoodle() {
  const [open, setOpen] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const token = user.accessToken;
  const fecha = new Date();

  const fetchData = async (token) => {
    const responce = await fetch("http://localhost:4000/code6", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const result = await responce.json();
    setData(result);
  };

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  const handelHome = () => {
    navigate("/");
  };

  const colums = [
    {
      name: "count",
      label: "Cantidad de acceso a la plataforma",
    },
    {
      name: "username",
      label: "Usuario",
    },
    {
      name: "nombre",
      label: "Nombre",
    },
  ];

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "scroll",
    print: false,
    onDownload: (buildHead, buildBody, columns, values) => {
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      //console.log(values.forEach((val) => console.log(val)));
      const json = values.reduce((result, val) => {
        const temp = {};
        val.data.forEach((v, idx) => {
          temp[columns[idx].label] = v;
        });
        result.push(temp);
        return result;
      }, []);
      const fileName = `Cantidad accesos por usuario a la plataforma en el ultimo mes ${fecha}`;
      const ws = utils.json_to_sheet(json);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      saveAs(data, fileName + fileExtension);
      // cancel default  CSV download from table
      return false;
    },
    textLabels: {
      toolbar: {
        downloadCsv: "Download XLSX",
      },
    },
  };

  const Menus = [
    { title: "Profesores", src: "./../img/assets/Chart_fill", id: 1 },
    {
      title: "Largo teimpo de desconexión",
      src: "./../img/assets/Search",
      id: 2,
    },
    {
      title: "Nunca realizó conexión a un curso",
      src: "./../img/assets/Search",
      id: 3,
    },
    {
      title: "Evaluación docente por curso",
      src: "./../img/assets/Search",
      id: 4,
    },
    { title: "Estudiantes por curso", src: "./../img/assets/Search", id: 5 },
    {
      title: "Cantidad de accesos a la plataforma por usuario",
      src: "./../img/assets/Search",
      id: 6,
    },
    {
      title: "Nunca realizó conexión a la plataforma",
      src: "./../img/assets/Search",
      id: 7,
    },
  ];

  const handelLogUot = async () => {
    await logout();
  };

  return (
    <div className="w-full h-screen flex">
      <div
        className={`${
          open ? "w-72 bg-utsb" : "w-20 bg-utsg "
        } duration-300 h-auto p-5 pt-8  relative`}
      >
        <img
          src={control}
          alt="control.png"
          className={`cursor-pointer absolute -right-3 top-9 w-7 border-utsb border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={Chart}
            alt="Chart.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Consultas.
          </h1>
        </div>
        <ul className="pt-6">
          <li
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}
            onClick={handelHome}
          >
            <img src={folder} alt="folder" />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Inicio
            </span>
          </li>
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 5 && "bg-light-white"
              } `}
              onClick={() => {
                if (Menu.id === 1) {
                  navigate("/profesores");
                } else if (Menu.id === 2) {
                  navigate("/Larga_Desconexion");
                } else if (Menu.id === 3) {
                  navigate("/Nunca_Conexion_courses");
                } else if (Menu.id === 4) {
                  navigate("/Evaluacion_Docente");
                } else if (Menu.id === 5) {
                  navigate("/Estudiantes");
                } else if (Menu.id === 6) {
                  navigate("/Acceso_Moodle_Usuarios");
                } else if (Menu.id === 7) {
                  navigate("/Nunca_Conexion");
                } else {
                  setError(
                    "Codigo incorrecto por favos comuniquese con el administrador del sistema"
                  );
                }
              }}
            >
              <img src={Search} alt="#" className="snap-always" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
          <li
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 absolute bottom-5 `}
            onClick={handelLogUot}
          >
            <img src={User} alt="User" />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Cerrar Sesión
            </span>
          </li>
        </ul>
      </div>
      <div className=" w-full flex items-center justify-center ">
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
          <img src={logo} className="m-auto" alt="logo" />
          <div className="m-auto p-10">
            <span className="mt-4">{error && <Alert message={error} />}</span>
            <MUIDataTable
              className="items-center justify-center m-auto"
              title="Accesos a la plataforma en el ultimo mes"
              data={data}
              columns={colums}
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
