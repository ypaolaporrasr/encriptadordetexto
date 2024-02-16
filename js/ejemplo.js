const inputMensaje = document.querySelector('#mensaje');
const outputEncriptado = document.querySelector('#textoEncriptado');

const btnEncriptar = document.querySelector('#btnEncriptar');
const btnDesencriptar = document.querySelector('#btnDesencriptar');
const btnCopiar = document.querySelector('#btnCopy');

btnEncriptar.addEventListener('click', encriptarFrase);
btnDesencriptar.addEventListener('click', desencriptarFrase);
btnCopiar.addEventListener('click', copiarTextoEncriptado);

function validateInput(input) {
  const regex = /^[a-z0-9 ]*$/;
  return regex.test(input);
}

// const desencriptarMensaje = document.querySelector('.mensajeEncriptado');
// const mensajeDesencriptado = document.querySelector('.resultadoDesencriptado');

function encriptarFrase() {
    const input = inputMensaje.value;
    if (!validateInput(input)) {
      showMessage("error", "Entrada no válida. Solo se permiten letras minúsculas, números y espacios.");
      return;
    }
  
    const fraseEncriptada = encrypt(input); // Implementacion de algoritmo de encriptacion
    outputEncriptado.value = fraseEncriptada;
  
    inputMensaje.value = "";
    showMessage("Exito", "¡Frase encriptada exitosamente!");
  }

  function desencriptarFrase() {
    const input = inputMensaje.value;
    if (!validateInput(input)) {
      showMessage("error", "Entrada no válida. Solo se permiten letras minúsculas, números y espacios.");
      return;
    }
  
    const fraseDesencriptada = decrypt(input); // Implementacion de algoritmo de desencriptacion
    outputEncriptado.value = fraseDesencriptada;
  
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
  
  // Implementaciones de los algoritmos encrypt y decrypt
  function encrypt(input) {
    const alfabeto = "abcdefghijklmnñopqrstuvwxyzáéíóú";
    const clave = "zyxwvutsrqponmlkjihgfedcbañéíóúá";
    let resultado = "";
  
    for (let i = 0; i < input.length; i++) {
      const indice = alfabeto.indexOf(input[i]);
      if (indice !== -1) {
        resultado += clave[indice];
      } else {
        resultado += input[i];
      }
    }
  
    return resultado;
  }

  function decrypt(input) {
    const alfabeto = "abcdefghijklmnñopqrstuvwxyzáéíóú";
    const clave = "zyxwvutsrqponmlkjihgfedcbañéíóúá";
    let resultado = "";
  
    for (let i = 0; i < input.length; i++) {
      const indice = clave.indexOf(input[i]);
      if (indice !== -1) {
        resultado += alfabeto[indice];
      } else {
        resultado += input[i];
      }
    }
  
    return resultado;
  }
  
//   function encriptar(frase) {
//     // Implementación de cifrados
//     const encriptarTexto= {
//       // Reemplazo de caracteres
//       encriptar(value) {
//         const reemplazar = {
//           "e": "enter",
//           "i": "imes",
//           "a": "ai",
//           "o": "ober",
//           "u": "ufat"
//         };
//         return value.replace(/[aeiou]/i, char => reemplazar[char]);
//       }
//     };
//     return encriptarTexto.encriptar(frase);
//   }
  
//   function encriptarFrase() {
//     const input = textoInput.value;
//     if (!validateInput(input)) {
//       //Mostrar mensaje de error específico basado en falla de validación
//       showMessage("error", "Invalid input. Please enter a valid phrase.");
//       return;
//     }
  
//     const fraseDesencriptada = encriptar(input);
//     textoInputEncriptado.value = fraseDesencriptada;
  
//     // Borrar campo de entrada y mostrar mensaje de éxito
//     textoInput.value = '';
//     showMessage("Exito", "¡Frase cifrada con éxito!");
//   }
  
//   btnEncriptar.addEventListener('click', encriptarFrase);

// // Función para copiar el texto cifrado.
// function copiarTextoEncriptado() {
//     try {
//       const textoACopiar = textoInputEncriptado.value;
//       if (textoACopiar) {
//         navigator.clipboard.writeText(textoACopiar)
//           .then(() => {
//             // Borrar entrada y mostrar mensaje de éxito
//             textoInputEncriptado.value = '';
//             textoInputEncriptado.disabled = true; // Deshabilitar la entrada después de copiar
//             showMessage("éxito", "¡Texto copiado exitosamente!");
//           })
//           .catch(error => {
//             // Mostrar mensaje de Texto no copiado
//             showMessage("error", "No se pudo copiar el texto. Inténtalo de nuevo.");
//             console.error("Error generado:", error);
//           });
//       } else {
//         showMessage("error", "No hay texto para copiar.");
//       }
//     } catch (error) {
//       console.error("Error en la función de copia:", error);
//       showMessage("error", "Ocurrió un error inesperado.");
//     }
//   }
//   btnCopy.addEventListener('click', copiarTextoEncriptado);
  
//   // Función para descifrar la frase.
//   function desencriptarFrase() {
//     try {
//       const desencriptarFrase = textoInput.value
//         .replaceAll("ufat", "u")
//         .replaceAll("ober", "o")
//         .replaceAll("ai", "a")
//         .replaceAll("imes", "i")
//         .replaceAll("enter", "e");
  
//         textoInputEncriptado.value = desencriptarFrase
  
//       // Show success message and clear input
//       showMessage("Exito", "¡Frase descifrada exitosamente!");
//       textoInput.value = '';
//     } catch (error) {
//       console.error("Error en la función de descifrar:", error);
//       showMessage("Error", "Ocurrió un error inesperado.");
//     }
//   }
//   btnDesencriptar.addEventListener('click', desencriptarFrase);