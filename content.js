// El corazón de Seotblock v2.0
// Se ejecuta constantemente para una respuesta inmediata.
setInterval(() => {
    
    // --- TÁCTICA 1: ACELERACIÓN Y SILENCIO ---
    const adContainer = document.querySelector('.ad-showing');
    const videoPlayer = document.querySelector('video.html5-main-video');

    if (adContainer && videoPlayer) {
        // Si hay un anuncio visible, ¡ataca!
        if (!videoPlayer.muted) {
            videoPlayer.muted = true; // Silencio inmediato
        }
        // Acelera el anuncio para que termine en un instante
        videoPlayer.playbackRate = 16; 
    }

    // --- TÁCTICA 2: CLIC ULTRARRÁPIDO EN BOTONES ---
    // Busca botones de "Saltar" modernos y antiguos.
    const skipButtonModern = document.querySelector('.ytp-ad-skip-button-modern');
    const skipButton = document.querySelector('.ytp-ad-skip-button');
    const adOverlay = document.querySelector('.ytp-ad-overlay-close-button');

    if (skipButtonModern) {
        skipButtonModern.click();
        showSkipNotification();
    } else if (skipButton) {
        skipButton.click();
        showSkipNotification();
    }

    // Cierra los banners que aparecen sobre el video.
    if (adOverlay) {
        adOverlay.click();
    }

    // --- TÁCTICA 3: ELIMINACIÓN DE BANNERS LATERALES ---
    // Elimina los anuncios que aparecen como videos sugeridos o en el feed.
    const companionAd = document.querySelector('#companion, #player-ads, .ytd-ad-slot-renderer');
    if (companionAd) {
        companionAd.remove();
    }

}, 50); // Se ejecuta 20 veces por segundo. ¡Ultrarrápido!


// La notificación sigue siendo la misma, ¡para que sepas que hicimos el trabajo!
function showSkipNotification() {
  // Evita spamear notificaciones si ya hay una
  if (document.querySelector('.seotblock-notification')) return;

  const notification = document.createElement('div');
  notification.className = 'seotblock-notification';
  notification.innerText = '¡Anuncio neutralizado por Seotblock!';
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 2500);
}
