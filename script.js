const tg = window.Telegram.WebApp;

// Инициализация Mini App
tg.expand();           // Разворачиваем на весь экран
tg.ready();            // Сообщаем Telegram, что приложение готово
tg.MainButton.hide();  // Скрываем основную кнопку

// Функция отправки данных
async function sendData() {
    const input = document.getElementById('input').value.trim();
    
    if (!input) {
        tg.showAlert("Введите данные!");
        return;
    }

    // Парсинг данных
    const parts = input.replace(/\n/g, ' ').split(/\s+/).filter(Boolean);
    
    const nick = parts[0] || '';
    const email = parts.find(p => p.includes('@')) || '';
    const phone = parts.find(p => /^\+?\d[\d\s\-\(\)]+$/.test(p)) || '';

    const data = {
        nick: nick,
        email: email,
        phone: phone,
        timestamp: new Date().toLocaleString('ru-RU')
    };

    try {
        // Отправляем данные боту
        tg.sendData(JSON.stringify(data));
        
        tg.showAlert("✅ Данные отправлены!");
        
        // Закрываем приложение через 800мс
        setTimeout(() => {
            tg.close();
        }, 800);

    } catch (error) {
        tg.showAlert("❌ Ошибка отправки данных");
        console.error(error);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Mini App успешно загружен');
    
    // Дополнительно: можно добавить отправку по Enter (удобно)
    const inputField = document.getElementById('input');
    if (inputField) {
        inputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendData();
            }
        });
    }
});
