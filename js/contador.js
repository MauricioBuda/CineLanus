import { hayONoHayFuncion } from "./app";


async function startCountdown() {

  await hayONoHayFuncion()

    // Obtiene la fecha actual
    const now = new Date();
  
    // Encuentra el próximo sábado a las 18:30
    let targetDate = new Date();
    targetDate.setDate(now.getDate() + ((6 - now.getDay() + 7) % 7));
    targetDate.setHours(18, 30, 0, 0);
  
    // Si hoy es sábado y ya pasó la hora, establece el target para el próximo sábado
    if (now > targetDate) {
      targetDate.setDate(targetDate.getDate() + 7);
    }
  
    // Actualiza el contador cada segundo
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeRemaining = targetDate - currentTime;
  
      // Cálculos de días, horas, minutos y segundos restantes
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);


  
      // Muestra el contador en el HTML
      document.getElementById("countdown").innerHTML =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
  
      // Si la cuenta regresiva termina, se reinicia para el próximo sábado
      if (timeRemaining < 0) {
        clearInterval(interval);
        startCountdown(); // Llama a la función para el siguiente sábado
      }
    }, 1000);
  }

  async function contadorOCancelada() {
    let respuesta = await hayONoHayFuncion();
    if (respuesta) {
      startCountdown();
    } else {
      document.getElementById("countdown").innerText = "X"
    }
  }

  contadorOCancelada();
  
  // Inicializa la cuenta regresiva
  