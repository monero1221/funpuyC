const webhookURL = "https://discord.com/api/webhooks/1501849957433606154/jkJrq5dqUsIYmTHLtKtNrALhS4Byco4mgyTXWrmrGL-wYeZKFS_B5CbYIAqefh9o-FFf";

const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('sendBtn');
const statusDiv = document.getElementById('status');

async function sendMessage() {
    const content = messageInput.value.trim();

    if (!content) {
        showStatus("Введите сообщение!", "red");
        return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = "Отправка...";
    showStatus("Отправляем...", "#7289da");

    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: content,
                username: "Сайт", 
                avatar_url: "" // Можешь вставить ссылку на аватарку
            })
        });

        if (response.ok) {
            showStatus("Сообщение успешно отправлено!", "lime");
            messageInput.value = "";
        } else {
            showStatus("Ошибка при отправке", "red");
        }
    } catch (error) {
        console.error(error);
        showStatus("Ошибка соединения с Discord", "red");
    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = "Отправить в Общее";
    }
}

function showStatus(text, color) {
    statusDiv.textContent = text;
    statusDiv.style.color = color;
}

// Клик по кнопке
sendBtn.addEventListener('click', sendMessage);

// Отправка по Enter (Shift + Enter для новой строки)
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});
