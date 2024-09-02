const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");
const { Script } = require("vm");
const TOKEN = "7289862727:AAGt3NWSecR--8VpzvxYXjwV2mUin1ApHwA";
const server = express();
const bot = new TelegramBot(TOKEN, {
    polling: true
});
const port = process.env.PORT || 5000;
const gameName = "Example";
const queries = {};
server.use(express.static(path.join(__dirname, 'Builds')));
bot.start((ctx) => ctx.reply('Welcome!!!', {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: "Start", web_app: {
                        url: "${https://visitoff.github.io/TestTaskFront/}/#/"
                    }
                },
                {
                    text: "About", callback_data: "about_us"
                }]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    }
}));
bot.onText(/game/, (msg) => msg.reply('Welcome!!!', {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: "Start", web_app: {
                        url: "${https://visitoff.github.io/TestTaskFront/}/#/"
                    }
                },
                {
                    text: "About", callback_data: "about_us"
                }]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    }
}));
// bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "Say /game if you want to play."));
// bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName));
// bot.on("callback_query", function (query) {
//     if (query.game_short_name !== gameName) {
//         bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "np[' is not available.");
//     } else {
//         queries[query.id] = query;
//         let gameurl = "https://visitoff.github.io/TestTaskFront/";
//         bot.answerCallbackQuery({
//             callback_query_id: query.id,
//             url: gameurl
//         });
//     }
// });
// bot.on("inline_query", function (iq) {
//     bot.answerInlineQuery(iq.id, [{
//         type: "game",
//         id: "0",
//         game_short_name: gameName
//     }]);
// });
server.get("/highscore/:score", function (req, res, next) {
    if (!Object.hasOwnProperty.call(queries, req.query.id)) return next();
    let query = queries[req.query.id];
    let options;
 
    let tg = window.Telegram.WebApp; 
    console.log("init data");
    console.log(tg.initData);
    if (query.message) {
        options = {
            chat_id: query.message.chat.id,
            message_id: query.message.message_id
        };
    } else {
        options = {
            inline_message_id: query.inline_message_id
        };
    }
    bot.setGameScore(query.from.id, parseInt(req.params.score), options,
        function (err, result) {});
});
server.listen(port);