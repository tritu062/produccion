import React, { useEffect } from "react";
import { useState } from "react";
import MUIDataTable from "mui-datatables";
import { useAuth } from "../../context/authContext";
import logo from "../../img/logo.png";
import { saveAs } from "file-saver";
import { write, utils } from "xlsx";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import {adrres} from "./address";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
}); 

export function Teacher() {
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [data, setData] = useState([]);
  const { user, recarga } = useAuth();
  recarga();
  const token = user.accessToken;
  const fecha = new Date();

  const fetchData = async (token) => {
    const responce = await fetch(`${adrres}/code1`, {
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

  const colums = [
    {
      name: "curso",
      label: "Curso",
    },
    {
      name: "docente",
      label: "Nombre",
    },
    {
      name: "correo",
      label: "Correo",
    },
    {
      name: "ultimo_acceso",
      label: "Ultimo Acceso al curso (En Dias)",
      options: {
        sortCompare: (order) => {
        return (obj1, obj2) => {
          let val1 = parseInt(obj1.data, 10);
          let val2 = parseInt(obj2.data, 10);
          return (val1 - val2) * (order === "asc" ? 1 : -1);
        };
      }
    }
    },
  ];

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
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
      const fileName = `Ultimo Acceso De Los Docentes ${fecha}`;
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

  return (
    <div className="all">
      <div className="w-full flex px-10 py-20 rounded-3xl items-center justify-center ">
      <div className="bg-white m-auto px-10 py-20 rounded-3xl border-2 border-gray-100">
        <img src={logo} className="m-auto" alt="logo" />
        <div className="m-auto p-10">            
          <CacheProvider value={muiCache}>
            <ThemeProvider theme={createTheme()}>
              <MUIDataTable
                title="Ultimo acceso de los docentes"
                data={data}
                columns={colums}
                options={options}
              />
            </ThemeProvider>
          </CacheProvider>
        </div>
      </div>
    </div>
    </div>
    
  );
}

