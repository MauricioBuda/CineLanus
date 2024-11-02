

document.getElementById("openModalBtn").addEventListener("click", function () {
    
    
    // Muestra la ventana modal
    document.getElementById("modal").style.display = "flex";

    console.log("Intentando lanzar confeti...");
  
    // Lanza el confeti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  });
  
  document.getElementById("closeModalBtn").addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
  });
  
  // Cierra el modal al hacer clic fuera de él
  window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  