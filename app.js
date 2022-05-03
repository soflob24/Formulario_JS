const form = document.getElementById("formulario");
const fullName = document.getElementById("name");
const age = document.getElementById("edad");
const tel = document.getElementById("telefono");
const email = document.getElementById("correo");
const pass = document.getElementById("contraseña");
const alertaNombre = document.querySelector(".alerta-nombre");
const alertaEdad = document.querySelector(".alerta-edad");
const alertaTelefono = document.querySelector(".alerta-telefono");
const alertaEmail = document.querySelector(".alerta-email");
const alertaContraseña = document.querySelector(".alerta-contraseña");
const btnEnviar = document.getElementById("btn-enter");
const tabla = document.getElementById("tabla");

const incrementar = (numero=0) => () => numero++;
const numero = incrementar();

// Objeto donde se guardan los datos ingresados
let formulario = {
  nombre: "",
  edad: "",
  telefono: "",
  correo: "",
  contraseña: "",
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
});

// Función que recorre los datos de usuario para posteriormente agregarlos a una tabla
function renderizarPantalla() {
  const usuarios = obtenerUsuarios();
  const usuariosConvertidos = JSON.parse(usuarios);
  tabla.innerHTML = null;
  usuariosConvertidos.forEach((usuario) => {
    const elemento = document.createElement("tr");
    elemento.innerHTML = `<td>${usuario.nombre}</td> <td>${usuario.edad}</td> <td>${usuario.telefono}</td> <td>${usuario.correo}</td> <td><button class="btn" onclick="eliminarUsuario(${usuario.id})">🗑️</button></td>`;
    tabla.appendChild(elemento);
  });
}





// Función para mostrar alertas generales al final del formulario en un tiempo estimado de 3 segundos
function mostrarMensaje(msg) {
  const alerta = document.querySelector(".error");
  if (!alerta) {
    const alerta = document.createElement("p");
    alerta.textContent = msg;
    alerta.classList.add("error");

    form.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

// Validación de nombre
function validarNombre(fullName) {
  if (fullName === "") {
    console.log("");
  } else if (
    fullName.length < 3 ||
    fullName.length > 40 ||
    !isNaN(fullName) ||
    fullName.match(/\d/) ||
    fullName.match(/[$@(¿/"!%#*)¡?&+-]/)
  ) {
    alertaNombre.innerHTML =
      "No se permiten números ni caracteres especiales en este campo";
    alertaNombre.style.color = "red";
  } else {
    alertaNombre.innerHTML = "Nombre válido";
    alertaNombre.style.color = "green";
  }
}

fullName.addEventListener("keyup", function (e) {
  let fullName = e.target.value;
  validarNombre(fullName);
  formulario.nombre = fullName;
});

function limpiarAlerta() {
  alertaNombre.innerHTML = "";
  alertaEdad.innerHTML = "";
  alertaTelefono.innerHTML = "";
  alertaEmail.innerHTML = "";
  alertaContraseña.innerHTML = "";
}

// Validación de edad
function validarEdad(age) {
  if (age === "") {
    console.log("");
  } else if (age < 18) {
    alertaEdad.innerHTML = "Debe ser mayor de edad";
    alertaEdad.style.color = "red";
  } else {
    alertaEdad.innerHTML = "Edad válida";
    alertaEdad.style.color = "green";
  }
}

age.addEventListener("keyup", function (e) {
  let age = e.target.value;
  validarEdad(age);
  formulario.edad = age;
});

// Validación de teléfono
function validarTelefono(tel) {
  if (tel === "") {
    console.log("");
  } else if (tel.length >= 7 && tel.length <= 10) {
    alertaTelefono.innerHTML = "Teléfono válido";
    alertaTelefono.style.color = "green";
  } else {
    alertaTelefono.innerHTML = "Debe tener mínimo 7 dígitos, máximo 10";
    alertaTelefono.style.color = "red";
  }
}

tel.addEventListener("keyup", function (e) {
  let tel = e.target.value;
  validarTelefono(tel);
  formulario.telefono = tel;
});

// Validación de correo
function validarCorreo(email) {
  if (email === "") {
    console.log("");
  } else if (email.includes("@") && email.includes(".")) {
    alertaEmail.innerHTML = "Correo válido";
    alertaEmail.style.color = "green";
  } else {
    alertaEmail.innerHTML = "Debe tener un @ y un .";
    alertaEmail.style.color = "red";
  }
}

email.addEventListener("keyup", function (e) {
  let email = e.target.value;
  validarCorreo(email);
  formulario.correo = email;
});

// Validación de contraseña
function validarContraseña(pass) {
  if (pass === "") {
    console.log("");
  } else if (
    pass.length >= 8 &&
    pass.length <= 15 &&
    pass.match(/[A-Z]/) &&
    pass.match(/\d/) &&
    pass.match(/[$@¿!%*?&+-]/)
  ) {
    alertaContraseña.innerHTML = "Contraseña válida";
    alertaContraseña.style.color = "green";
  } else {
    alertaContraseña.innerHTML =
      "Debe tener un dígito, una mayúscula y un caracter especial";
    alertaContraseña.style.color = "red";
  }
}

pass.addEventListener("keyup", function (e) {
  let pass = e.target.value;
  validarContraseña(pass);
  formulario.contraseña = pass;
});

// Condición para mostrar mensajes generales en caso de que el formulario esté vacío, incompleto o se haya llenado correctamente
btnEnviar.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    fullName.value === "" ||
    age.value === "" ||
    tel.value === "" ||
    email.value === "" ||
    pass.value === ""
  ) {
    mostrarMensaje("Complete el formulario");
  } else {
    mostrarMensaje("Ha sido registrado exitosamente");
    añadirUsuario();
    form.reset();
    limpiarAlerta();
  }
});

// Función para obtener los usuarios desde el localStorage
function obtenerUsuarios() {
  const usuarios = localStorage.getItem("usuarios");
  if (usuarios !== null) {
    return usuarios;
  }
  localStorage.setItem("usuarios", JSON.stringify([])); // Pasar de formato JSON a string
  return localStorage.getItem("usuarios");
}

// Función para añadir los usuarios al localStorage
function añadirUsuario() {
  const usuarios = obtenerUsuarios();
  const usuariosConvertidos = JSON.parse(usuarios); // Pasar de string a formato JSON
  localStorage.setItem(
    "usuarios",
    JSON.stringify([...usuariosConvertidos, { ...formulario, id: numero()}]) // Se le agrega un ID a cada usuario
  );
  renderizarPantalla();
}

// Función para eliminar un usuario del localStorage a partir de su ID
function eliminarUsuario(id) {
  const usuarios = obtenerUsuarios();
  const usuariosConvertidos = JSON.parse(usuarios);
  const nuevosUsuarios = usuariosConvertidos.filter((element) => {
    // Se filtran los datos
    return element.id !== id; // Para que retorne todos los que son diferentes al id del que el usuario seleccionó
  });
  console.log(nuevosUsuarios);
  localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
  setTimeout(function () {
    renderizarPantalla();
  }, 0);
}

// Recargar la página
window.onload = () => {
  renderizarPantalla();
};
