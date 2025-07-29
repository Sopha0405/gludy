export const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validarPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  return regex.test(password);
};

export const validarCoincidencia = (pass, confirmar) => pass === confirmar;

export const validarNombre = (nombre) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,}$/.test(nombre);
