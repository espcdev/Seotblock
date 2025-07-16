// Función para crear la notificación
function showSkipNotification() {
  const notification = document.createElement('div');
  notification.className = 'seotblock-notification';
  notification.innerText = '¡Anuncio saltado exitosamente!';
  document.body.appendChild(notification);

  // Desaparecer la notificación después de 3 segundos
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Función para buscar y hacer clic en el botón de saltar anuncio
function skipAd() {
  const skipButton = document.querySelector('.ytp-ad-skip-button-modern, .ytp-ad-skip-button');
  if (skipButton) {
    skipButton.click();
    showSkipNotification();
  }
}

// Observador para detectar cambios en la página (cuando aparece un anuncio)
const observer = new MutationObserver(skipAd);
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Ejecutar una vez al cargar la página por si ya hay un anuncio
skipAd();
