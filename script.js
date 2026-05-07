const webhookURL = "https://discord.com/api/webhooks/1501849957433606154/jkJrq5dqUsIYmTHLtKtNrALhS4Byco4mgyTXWrmrGL-wYeZKFS_B5CbYIAqefh9o-FFf";

const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('sendBtn');
const statusDiv = document.getElementById('status');

// Переключение вкладок
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

async function sendMessage() {
    const content = messageInput.value.trim();

    if (!content) {
        showStatus("Введите сообщение!", "#ff5555");
        return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = "Отправляем...";
    showStatus("Отправка сообщения...", "#8b6eff");

    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: content,
                username: "Поддержка Catlavan",
                avatar_url: "https://i.imgur.com/YourLogo.png" // можешь заменить
            })
        });

        if (response.ok) {
            showStatus("Сообщение успешно отправлено!", "#00ff9d");
            messageInput.value = "";
        } else {
            showStatus("Ошибка отправки", "#ff5555");
        }
    } catch (error) {
        console.error(error);
        showStatus("Ошибка соединения", "#ff5555");
    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = "Отправить сообщение";
    }
}

function showStatus(text, color) {
    statusDiv.textContent = text;
    statusDiv.style.color = color;
}

// Отправка по кнопке и Enter
sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});
