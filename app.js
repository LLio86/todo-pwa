const input = document.querySelector('input');
const list = document.querySelector('ul');

// Chiedi permesso per notifiche
if ("Notification" in window) {
    Notification.requestPermission().then(permission => {
        console.log("Permesso notifiche:", permission);
    });
}

function addTask() {
    if (input.value.trim() === '') return;

    const li = document.createElement('li');
    li.textContent = input.value;
    li.onclick = () => li.remove();
    list.appendChild(li);

    // Mostra notifica
    if (Notification.permission === "granted") {
        new Notification("✅ Task aggiunto", {
            body: input.value,
            icon: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
        });
    }

    input.value = '';
}

document.querySelector('button').onclick = addTask;
