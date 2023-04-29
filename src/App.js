import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/login/Login";
import { Home } from "./components/Home";
import { Register } from "./components/login/Register";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./components/PtotectedRoute";
import { ResetPass } from "./components/login/ResetPass";
import { Teacher } from "./components/Querys/Teacher";
import { Students } from "./components/Querys/Students";
import { TeacherEvaluation } from "./components/Querys/TeacherEvaluation";
import { NeverConectForCourse } from "./components/Querys/NeverConectForCourse";
import { NeverConect } from "./components/Querys/NeverConect";
import { AcceseToMoodlem } from "./components/Querys/AcceseToMoodleM";
import { AcceseToMoodlet } from "./components/Querys/AcceseToMoodleT";
import { AcceseToMoodles } from "./components/Querys/AcceseToMoodleS";
import { LongDisconect } from "./components/Querys/LongDisconect";
import { AlertTeacherEvaluation } from "./components/Querys/AlertTeacherEvaluation";
import Navbar from "./components/Navbar/Navbar";


function App() {
  return (
    <div>
      <AuthProvider>       
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>  
                <Navbar />              
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profesores"
            element={
              <ProtectedRoute>
                <Navbar />
                <Teacher />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Estudiantes"
            element={
              <ProtectedRoute>
                <Navbar />
                <Students />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Evaluacion_Docente"
            element={
              <ProtectedRoute>
                <Navbar />
                <TeacherEvaluation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Nunca_Conexion_courses"
            element={
              <ProtectedRoute>
                <Navbar />
                <NeverConectForCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Nunca_Conexion"
            element={
              <ProtectedRoute>
                <Navbar />
                <NeverConect />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Larga_Desconexion"
            element={
              <ProtectedRoute>
                <Navbar />
                <LongDisconect />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Acceso_Moodle_Usuariosm"
            element={
              <ProtectedRoute>
                <Navbar />
                <AcceseToMoodlem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Acceso_Moodle_Usuariost"
            element={
              <ProtectedRoute>
                <Navbar />
                <AcceseToMoodlet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Acceso_Moodle_Usuarioss"
            element={
              <ProtectedRoute>
                <Navbar />
                <AcceseToMoodles />
              </ProtectedRoute>
            }
          />          
          <Route
            path="/Alerta_Evaluacion"
            element={
              <ProtectedRoute>
                <Navbar />
                <AlertTeacherEvaluation />
              </ProtectedRoute>
            }
          />          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<ResetPass />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
