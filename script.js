const tg = window.Telegram.WebApp;

tg.expand();                    // Разворачиваем на весь экран
tg.MainButton.hide();           // Скрываем основную кнопку Telegram

async function sendData() {
    const input = document.getElementById('input').value.trim();
    
    if (!input) {
        tg.showAlert("Введите данные!");
        return;
    }

    // Простой парсинг (можно улучшить)
    const parts = input.replace(/\n/g, ' ').split(/\s+/);
    const nick = parts[0] || '';
    const email = parts.find(p => p.includes('@')) || '';
    const phone = parts.find(p => p.match(/^\+?\d/)) || '';

    const data = {
        nick: nick,
        email: email,
        phone: phone,
        timestamp: new Date().toLocaleString('ru-RU')
    };

    tg.sendData(JSON.stringify(data));   // Отправляем боту
    tg.showAlert("Данные отправлены!");
    
    // Закрываем приложение через 1 сек
    setTimeout(() => tg.close(), 1000);
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    console.log('Mini App loaded');
});
