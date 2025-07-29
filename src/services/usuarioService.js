const BASE_URL = "http://localhost/backend";

export const guardarUsuario = async (usuario) => {
  const res = await fetch(`${BASE_URL}/registro.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });

  const json = await res.json();

  if (!res.ok) {
    // Aquí intentamos detectar el campo para asignar error específico en React
    // Si el backend envía message y quizá un "field" podrías leerlo:
    const error = new Error(json.message || "Error al registrar");
    error.field = null;
    // Por ejemplo, si usas códigos de estado para diferenciar:
    if (res.status === 409) error.field = "email";
    if (res.status === 400) {
      if (json.message?.toLowerCase().includes("email")) error.field = "email";
      else if (json.message?.toLowerCase().includes("nombre")) error.field = "nombre";
      else if (json.message?.toLowerCase().includes("password")) error.field = "password";
    }
    throw error;
  }

  return json;
};

export const iniciarSesion = async (credenciales) => {
  const res = await fetch(`${BASE_URL}/login.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credenciales),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error en login");
  }

  return await res.json();
};
