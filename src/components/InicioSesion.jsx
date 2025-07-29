import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../services/usuarioService";
import "bootstrap/dist/css/bootstrap.min.css";

export default function InicioSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const res = await iniciarSesion({ email, password });
      alert("Bienvenido " + res.nombre);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light p-3">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-4 p-md-5 rounded-4"
        style={{ maxWidth: 400, width: "100%" }}
        noValidate
      >
        <div className="text-center mb-4">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: 80 }}
            className="mb-3"
          />
          <h3 className="fw-bold text-primary">INICIAR SESIÓN</h3>
          <p className="text-muted">Ingresa para continuar</p>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            className={`form-control ${error ? "is-invalid" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usuario@ejemplo.com"
            required
            autoComplete="email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-semibold">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className={`form-control ${error ? "is-invalid" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 py-2 fw-semibold"
          disabled={cargando}
        >
          {cargando ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Ingresando...
            </>
          ) : (
            "INGRESAR"
          )}
        </button>

        <p className="text-center mt-3 text-muted">
          ¿No tienes cuenta?{" "}
          <a href="/registro" className="text-decoration-none">
            Regístrate
          </a>
        </p>
      </form>
    </div>
  );
}
