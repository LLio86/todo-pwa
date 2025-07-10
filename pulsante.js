// Selettore del bottone installazione (assicurati di avere un <button id="btnInstall"> nel tuo HTML)
const installBtn = document.getElementById('btnInstall');

let deferredPrompt = null;

// Rileva Android e mostra il pulsante quando possibile
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();  // Blocca il popup automatico
  deferredPrompt = e;
  if (installBtn) installBtn.style.display = 'block';
});

// Gestione click sul pulsante per mostrare la richiesta di installazione
if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('App installata con successo');
    } else {
      console.log('Installazione rifiutata');
    }

    deferredPrompt = null;
    installBtn.style.display = 'none';
  });
}

// Nascondi il pulsante se l'app è già installata
window.addEventListener('appinstalled', () => {
  console.log('App già installata');
  if (installBtn) installBtn.style.display = 'none';
});

// Funzione per mostrare messaggio guida su iOS Safari
function showIosInstallMessage() {
  const isIos = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
  const isInStandalone = window.navigator.standalone === true;

  if (isIos && !isInStandalone) {
    const msg = document.createElement('div');

      msg.innerHTML = `
  📱 Per installare l'app: tocca il pulsante <b>Condividi</b> in Safari e scegli <b>"Aggiungi a Home"</b>.
`     
      ;
    msg.style.cssText = '
      position: fixed;
      bottom: 10px;
      left: 10px;
      right: 10px;
      background: #fff0e1;
      padding: 12px;
      border-radius: 8px;
      font-size: 14px;
      text-align: center;
      z-index: 9999;
      box-shadow: 0 0 8px rgba(0,0,0,0.2);
      font-family: sans-serif;
    ';
    document.body.appendChild(msg);
  }
}

// Chiama la funzione al caricamento della pagina
window.addEventListener('load', showIosInstallMessage);
