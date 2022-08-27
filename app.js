const { Telegraf } = require("telegraf");

require("dotenv").config();

const { TOKEN, CHANNEL_ID } = process.env;

const bot = new Telegraf(TOKEN);

bot.hears(["В избранное!", "в избранное!", "в избранное"], (ctx) => {
  if (!ctx.update.message.reply_to_message) return;

  let messageId = ctx.update.message.reply_to_message.message_id;

  let chatId = ctx.update.message.chat.id;

  let username = ctx.update.message.from.username;

  let link = `https://t.me/c/${String(Math.abs(Number(chatId))).slice(3)}/${messageId}`;
 
  bot.telegram.sendMessage(
     chatId, "✅ Сообщение добавлено в избранное"
  );  

  bot.telegram.sendMessage(
    CHANNEL_ID,
    `📰 Добавлено пользователем - <b>${username}</b>\n\n<a href="${link}">🔽 Перейти к сообщению 🔽</a>`,
    { parse_mode: "HTML", disable_web_page_preview: true }
  );

  setTimeout(() => {
    bot.telegram
      .forwardMessage(CHANNEL_ID, chatId, messageId)
      .then(function () {
        console.log("mesage forwaded");
      });
  }, 3000);
});

bot.launch();
