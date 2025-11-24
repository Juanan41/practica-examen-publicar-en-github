// mascots.js — seguimiento suave del cursor con seguridad y logs mínimos

(function () {
  // Espera a que el DOM esté cargado por si el script se inyecta en otra posición
  function init() {
    const mascota = document.getElementById("mascota");
    if (!mascota) {
      // Si esto ocurre, revisa que el id en el HTML sea exactamente "mascota"
      console.error("Mascota: elemento con id 'mascota' no encontrado.");
      return;
    }

    // Inicializa posición en el centro de la ventana (por si)
    mascota.style.left = (window.innerWidth / 2) + "px";
    mascota.style.top = (window.innerHeight / 2) + "px";

    let targetX = parseFloat(mascota.style.left) || 0;
    let targetY = parseFloat(mascota.style.top) || 0;

    document.addEventListener("mousemove", (e) => {
      // Coordenadas objetivo (offset para que no esté pegada al cursor)
      targetX = e.clientX + 18;
      targetY = e.clientY + 18;
    });

    function follow() {
      // Tomamos la posición actual desde style (no getBoundingClientRect para evitar layout cost)
      const currentLeft = parseFloat(mascota.style.left) || 0;
      const currentTop  = parseFloat(mascota.style.top)  || 0;

      const newX = currentLeft + (targetX - currentLeft) * 0.15;
      const newY = currentTop  + (targetY - currentTop)  * 0.15;

      mascota.style.left = `${newX}px`;
      mascota.style.top  = `${newY}px`;

      requestAnimationFrame(follow);
    }

    requestAnimationFrame(follow);
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    // DOM ya está listo
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();

