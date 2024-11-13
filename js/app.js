import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get,  child } from "firebase/database";

import Swal from 'sweetalert2'




const firebaseConfig = {
  apiKey: "AIzaSyDzJlBt55BL3r2vIhRwlsMLs_0yR_mxABw",
  authDomain: "cinelanus-18fe3.firebaseapp.com",
  projectId: "cinelanus-18fe3",
  storageBucket: "cinelanus-18fe3.appspot.com",
  messagingSenderId: "507189909582",
  appId: "1:507189909582:web:c3430c0d8211fb4ce20b1f",
  measurementId: "G-RZPTR4X6V7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);









////////////////////////////////////////////////////////////////////////////////////////////

let hayFuncion
let laPeli
let trailerDB







// Función para saber si hay función ↓
async function hayONoHayFuncion () {
  const dbRef = ref(getDatabase());
  await get(child(dbRef, `HayFuncion`)).then((snapshot) => {
    if (snapshot.exists()) {
      hayFuncion = snapshot.val()
    } else {
      console.log("Error");
    }
  }).catch((error) => {
    console.error(error);
  });
  return hayFuncion
}









// Función para saber si hay función ↓
async function hayONoHayTrailer () {
  const dbRef = ref(getDatabase());
  await get(child(dbRef, `Trailer`)).then((snapshot) => {
    if (snapshot.exists()) {
      trailerDB = snapshot.val()
      console.log(trailerDB)
    } else {
      console.log("Error");
    }
  }).catch((error) => {
    console.error(error);
  });
  return trailerDB
}

hayONoHayTrailer()







// Función para saber que pelicula hay ↓
async function hayPeli () {
  const dbRef = ref(getDatabase());
  await get(child(dbRef, `Pelicula`)).then((snapshot) => {
    if (snapshot.exists()) {
      laPeli = snapshot.val()
    } else {
      console.log("Error");
    }
  }).catch((error) => {
    console.error(error);
  });
  return laPeli
}

hayPeli();







// Función para saber cuantas vacantes quedan ↓
async function cantidadVacantesDisponibles () {
    const dbRef = ref(getDatabase());
    let vacantes
    await get(child(dbRef, `vacantes/vacantes`)).then((snapshot) => {
      if (snapshot.exists()) {
        vacantes = snapshot.val()
        vacantesDisponibles.textContent = vacantes;
      } else {
        console.log("Error");
      }
    }).catch((error) => {
      console.error(error);
    });
    return vacantes
}





// Función para descontar vacantes ↓
function descontarVacante(vacantes) {
  const db = getDatabase();
  const vacantesRef = ref(db, 'vacantes/');

  // Leer el valor actual de vacantes
  get(vacantesRef).then((snapshot) => {
    if (snapshot.exists()) {
      const vacantesActuales = snapshot.val().vacantes || 0; // Valor actual o 0 si no existe
      const nuevoValor = vacantesActuales - vacantes;

      // Escribir el nuevo valor en la base de datos
      set(vacantesRef, { vacantes: nuevoValor })
        .then(() => {
          console.log("Vacantes actualizadas:", nuevoValor);
          // obtenerVacantesDisponibles()
        })
        .catch((error) => {
          console.error("Error al actualizar vacantes:", error);
        });
    } else {
      console.log("No existe el valor de vacantes");
      // set(vacantesRef, { vacantes: 2 }); // Inicializar en 2 si no existe
    }
  }).catch((error) => {
    console.error("Error al leer vacantes:", error);
  });
}









////////////////////////////////////////////////////////////////////////////////////////////










// Declaración de variables y eventos ↓


// Secciones ↓
let seccionNavBar = document.getElementById('navbar');
let seccionInicio = document.getElementById('inicio');
let seccionReservar = document.getElementById('reservar')
let seccionNosotros = document.getElementById('nosotros')

let seccionModalReserva = document.getElementById('modalReserva');
let seccionModalSugerencia = document.getElementById('modalSugerencia')


// Botones ↓
let botonAbreModalReserva = document.getElementById('botonReservar');
botonAbreModalReserva.addEventListener('click', mostrarOcultarModalReserva);

let btnXmodalReserva = document.getElementById('button-x-reserva');
btnXmodalReserva.addEventListener('click', mostrarOcultarModalReserva);

let btnXmodalSugerencia = document.getElementById('button-x-sugerencia');
btnXmodalSugerencia.addEventListener('click', mostrarOcultarModalSugerencia);

let sugerencias = document.getElementById('sugerenciasMenu');
sugerencias.addEventListener('click', mostrarOcultarModalSugerencia);
let cortosMenu = document.getElementById('cortosMenu');


// Variables ↓
let vacantesDisponibles = document.getElementById('vacantesDisponibles');

let divPelicula = document.getElementById('divPelicula');
let spanPelicula = document.getElementById('spanPelicula');
let divCancelacion = document.getElementById('divCancelacion');
let trailer = document.getElementById("trailer");









// Actualizo vacantes disponibles en pantalla
cantidadVacantesDisponibles();










// Corroborar si hay función, para renderizar el cartel correcto
async function confirmarSiHayFuncion () {
  let confirmacion = await hayONoHayFuncion()
  if(confirmacion){
    divPelicula.classList.remove('aplicarDisplayNone')
    divCancelacion.classList.add('aplicarDisplayNone')
  } else {
    divPelicula.classList.add('aplicarDisplayNone')
    divCancelacion.classList.remove('aplicarDisplayNone')
  }
}

confirmarSiHayFuncion();









// Corroborar si hay función, para renderizar el cartel correcto
async function confirmarSiHayTrailer () {
  let linkDelTrailer = await hayONoHayTrailer()
  if(!linkDelTrailer || linkDelTrailer === ''){
    trailer.classList.add('aplicarDisplayNone')
  } else {
    trailer.classList.remove('aplicarDisplayNone')
    trailer.href = linkDelTrailer;
  }
}

confirmarSiHayTrailer();









// Renderizar próxima película
async function quePeliculaRenderizar () {
  let peliParaRenderizar = await hayPeli()
  // if (spanPelicula && peliParaRenderizar) {
  spanPelicula.textContent = peliParaRenderizar;
  // } else {
  //   spanPelicula.textContent = "-";
  // }
}


  quePeliculaRenderizar();
















function mostrarOcultarModalReserva () {
    seccionModalReserva.classList.toggle('aplicarDisplayNone');

    seccionInicio.classList.toggle('aplicarBorroso');
    seccionNavBar.classList.toggle('aplicarBorroso');
    seccionReservar.classList.toggle('aplicarBorroso');
    seccionNosotros.classList.toggle('aplicarBorroso');
}


function mostrarOcultarModalSugerencia () {
    seccionModalSugerencia.classList.toggle('aplicarDisplayNone');

    seccionInicio.classList.toggle('aplicarBorroso');
    seccionNavBar.classList.toggle('aplicarBorroso');
    seccionReservar.classList.toggle('aplicarBorroso');
    seccionNosotros.classList.toggle('aplicarBorroso');
}



// LO REFERIDO A ENVÍO DE MAIL PARA RESERVA ↓
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Mostrar mensaje de "Cargando..."
    Swal.fire({
        title: 'Enviando...',
        text: 'Aguarde un momento por favor',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
  
    // Obtener los datos del formulario
    const name = document.getElementById('name').value;
    const mail = document.getElementById('email').value;
    const entradasPedidas = document.getElementById('entradasPedidas').value;
  
    // Crear el objeto del correo electrónico
    const templateParams = {
        from_name: name,
        to_name: 'Mauricio Ariel Buda',
        from_email: mail,
        from_vacantes: entradasPedidas
    };
  
    // Enviar el correo electrónico
    emailjs.send('service_lk8bztl', 'template_7fp3ice', templateParams)
        .then(function(response) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "¡Listo!",
                text: "Reserva hecha correctamente 🤘",
                showConfirmButton: false,
                timer: 2500
            });

            descontarVacante(entradasPedidas);
  
            setTimeout(() => {
                location.reload();
            }, 2400);
        }, function(error) {
            console.log('FAILED...', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "¡Algo falló!",
                text: "Por favor, revisá tu conexión y volvé a intentar",
                showConfirmButton: false,
                timer: 2500
            });
        });
  });
// FIN DE LO REFERIDO A ENVÍO DE MAIL PARA RESERVA ↑









// LO REFERIDO A ENVÍO DE MAIL PARA SUGENRENCIAS ↓
document.getElementById('contactForm2').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Mostrar mensaje de "Cargando..."
    Swal.fire({
        title: 'Enviando...',
        text: 'Aguarde un momento por favor',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
  
    // Obtener los datos del formulario
    const name2 = document.getElementById('name2').value;
    const pelicula = document.getElementById('pelicula').value;
  
    // Crear el objeto del correo electrónico
    const templateParams = {
        from_name: name2,
        to_name: 'Mauricio Ariel Buda',
        from_pelicula: pelicula,
    };
  
    // Enviar el correo electrónico
    emailjs.send('service_lk8bztl', 'template_6x755yj', templateParams)
        .then(function(response) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "¡Muchas gracias!",
                text: "La vamos a tener en cuenta 🤘",
                showConfirmButton: false,
                timer: 2500
            });

            descontarVacante(entradasPedidas);
  
            setTimeout(() => {
                location.reload();
            }, 2400);
        }, function(error) {
            console.log('FAILED...', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "¡Algo falló!",
                text: "Por favor, revisá tu conexión y volvé a intentar",
                showConfirmButton: false,
                timer: 2500
            });
        });
  });
// FIN DE LO REFERIDO A ENVÍO DE MAIL PARA RESERVA ↑




export { hayONoHayFuncion }
