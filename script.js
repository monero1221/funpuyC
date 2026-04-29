const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

// темы Telegram
document.documentElement.style.setProperty('--bg', tg.themeParams.bg_color || '#0d1117');

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  };
});

// Buy
document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.onclick = () => {
    const price = btn.parentElement.dataset.price;

    if (confirm(`Оплатить ${price} ₽?`)) {
      tg.sendData(JSON.stringify({ price }));
      tg.showAlert("Перейди в бота для оплаты");
    }
  };
});

// Bottom button
tg.MainButton.setText('Поддержка');
tg.MainButton.show();
tg.MainButton.onClick(() => {
  tg.openTelegramLink('https://t.me/your_username');
});