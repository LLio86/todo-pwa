const input = document.getElementById('taskInput');
const list = document.getElementById('taskList');

function addTask() {
    if (input.value.trim() === '') return;

    const li = document.createElement('li');
    li.textContent = input.value;
    li.onclick = () => li.remove();
    list.appendChild(li);

    // Mostra notifica locale
    if (Notification.permission === "granted") {
        new Notification("📋 Nuovo task aggiunto", {
            body: input.value,
            icon: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
        });
    }

    input.value = '';
}

Notification.requestPermission().then(permission => {
    if (permission === "granted") {
        console.log("✅ Notifiche abilitate!");
    }
});
