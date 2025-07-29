import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarEmail, validarPassword, validarCoincidencia } from "../utils/validaciones";
import { guardarUsuario } from "../services/usuarioService";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RegistroUsuario() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "", confirmar: "" });
  const [errores, setErrores] = useState({});
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const navigate = useNavigate();

  const validarCampos = (data) => {
    const nuevosErrores = {};
    if (!data.nombre) nuevosErrores.nombre = "Nombre requerido";
    if (!validarEmail(data.email)) nuevosErrores.email = "Correo no válido";
    if (!validarPassword(data.password)) nuevosErrores.password = "Mínimo 8 caracteres, mayúscula, número y símbolo";
    if (!validarCoincidencia(data.password, data.confirmar)) nuevosErrores.confirmar = "Las contraseñas no coinciden";
    return nuevosErrores;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrores((errs) => ({ ...errs, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroresValidados = validarCampos(form);
    setErrores(erroresValidados);

    if (Object.keys(erroresValidados).length === 0) {
      try {
        await guardarUsuario({
          nombre: form.nombre,
          email: form.email,
          password: form.password,
        });
        setRegistroExitoso(true);
        setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
        // Asumiendo que el backend devuelve error.message con mensaje adecuado
        setErrores({ email: err.message });
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-5 rounded-4"
        style={{ maxWidth: 400, width: "100%" }}
        noValidate
      >
        <div className="text-center mb-4">
          <img src="/logo.png" alt="Logo" style={{ width: 80 }} />
          <h3 className="mt-2 fw-bold">REGÍSTRATE</h3>
        </div>

        {["nombre", "email", "password", "confirmar"].map((campo) => (
          <div className="mb-3" key={campo}>
            <label className="form-label" htmlFor={campo}>
              {campo === "confirmar"
                ? "Confirmar contraseña"
                : campo.charAt(0).toUpperCase() + campo.slice(1)}
            </label>
            <input
              id={campo}
              type={campo.includes("password") ? "password" : "text"}
              name={campo}
              value={form[campo]}
              onChange={handleChange}
              className={`form-control ${errores[campo] ? "is-invalid" : ""}`}
              placeholder={campo === "email" ? "usuario@ejemplo.com" : ""}
              autoComplete={campo === "password" || campo === "confirmar" ? "new-password" : "off"}
            />
            {errores[campo] && <div className="invalid-feedback">{errores[campo]}</div>}
          </div>
        ))}

        <button className="btn btn-primary w-100 mt-3 fw-semibold" type="submit">
          REGISTRARSE
        </button>

        {registroExitoso && (
          <div className="alert alert-success text-center mt-3">
            Registro exitoso. Redirigiendo...
          </div>
        )}

        <p className="text-center mt-3">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </form>
    </div>
  );
}
