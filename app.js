// Seleziona gli elementi della pagina
const input = document.querySelector('input');
const addBtn = document.querySelector('button');
const list = document.querySelector('ul');

// Richiede il permesso per mostrare notifiche
if ('Notification' in window) {
  Notification.requestPermission().then(permission => {
    console.log('Permesso notifiche:', permission);
  });
}

// Funzione per aggiungere un nuovo task
function addTask() {
  const text = input.value.trim();
  if (text === '') return;

  const li = document.createElement('li');
  li.textContent = text;

  // Permette di rimuovere il task cliccandolo
  li.addEventListener('click', () => {
    li.remove();
  });

  list.appendChild(li);

  // Mostra notifica locale (se permesso è concesso)
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('📋 Nuovo task aggiunto', {
      body: text,
      icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828817.png' // puoi cambiare l’icona
    });
  }

  // Pulisce l'input
  input.value = '';
}

// Aggiunge il task al click del bottone
addBtn.addEventListener('click', addTask);

// Aggiunge il task premendo INVIO nella casella di testo
input.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    addTask();
  }
});
