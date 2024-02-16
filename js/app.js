const inputMensaje = document.querySelector('#mensaje');
const outputEncriptado = document.querySelector('#textoEncriptado');
const outputDesencriptado = document.querySelector('#textoEncriptado');

const btnEncriptar = document.querySelector('#btnEncriptar');
const btnDesencriptar = document.querySelector('#btnDesencriptar');
const btnCopiar = document.querySelector('#btnCopiar');

btnEncriptar.addEventListener('click', encriptarFrase);
btnDesencriptar.addEventListener('click', desencriptarFrase);
btnCopiar.addEventListener('click', copiarTextoEncriptado);

const vocalesEncriptadas= {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufar",
};
const vocalesDesencriptadas= {
  ai: "a",
  enter: "e",
  imes: "i",
  ober: "o",
  ufar: "u",
};

function encriptarMensaje(texto) {
  const regex = /[aeiou]/gi;
  return texto.replace(regex, (vocal) => vocalesEncriptadas[vocal]);
}

function encriptar(input) {
  const fraseEncriptada = encriptarMensaje(input);
  return fraseEncriptada;
}

function encriptarFrase() {
  const input = inputMensaje.value;
  const fraseEncriptada = encriptar(input);
  outputEncriptado.value = fraseEncriptada;
  inputMensaje.value = "";
  showMessage("Exito", "¡Frase encriptada exitosamente!");
}

function desencriptarMensaje(texto) {
  const regex = /ai|enter|imes|ober|ufar/gi;
  return texto.replace(regex, (vocal) => vocalesDesencriptadas[vocal]);
}

function desencriptar(input) {
  const fraseDesencriptada = desencriptarMensaje(input);
  return fraseDesencriptada;
}

function desencriptarFrase() {
  const input = inputMensaje.value;
  const fraseDesencriptada = desencriptar(input);
  outputDesencriptado.value = fraseDesencriptada;
  inputMensaje.value = "";
  showMessage("Exito", "¡Frase desencriptada exitosamente!");
}

function copiarTextoEncriptado() {
  try {
    const textoACopiar = outputEncriptado.value;
    if (textoACopiar) {
      navigator.clipboard.writeText(textoACopiar)
        .then(() => {
          outputEncriptado.value = "";
          outputEncriptado.disabled = true;
          showMessage("success", "¡Texto copiado exitosamente!");
        })
        .catch(error => {
          console.error("Error al copiar:", error);
          showMessage("error", "No se pudo copiar el texto. Inténtalo de nuevo.");
        });
    } else {
      showMessage("error", "No hay texto para copiar.");
    }
  } catch (error) {
    console.error("Error en la función copiar:", error);
    showMessage("error", "Ocurrió un error inesperado.");
  }
}

function showMessage(tipo, mensaje) {
  const mensajeElement = document.querySelector('#mensaje');
  mensajeElement.textContent = mensaje;

  if (tipo === 'error') {
    mensajeElement.classList.add('error');
  } else {
    mensajeElement.classList.remove('error');
  }
}