const dotenv = require('dotenv');
const { Bot } = require('grammy');

dotenv.config();

(async () => {
    const bot = new Bot(process.env.BOT_TOKEN);

    bot.use(async (ctx, next) => {
        ctx.config = {
            developer: +process.env.CREATOR,
            isDeveloper: ctx.from?.id === +process.env.CREATOR,
        };
        await next();
    });

    bot.command('admin', (ctx) => {
        console.log(ctx.config);
        console.log(ctx.from);
        if (ctx.config.isDeveloper) {
            ctx.reply('Hello, Developer')
        } else {
            ctx.reply('Ty kto')
        }
    })

    bot.command('force_reply', (ctx) => {
        ctx.reply('What is your name?', { reply_markup: { force_reply: true } });
    })

    bot.command('start', (ctx) => {
        // bot.api.sendSticker(process.env.CREATOR, 'CAACAgIAAxkBAAMZYtb2m7IKCoE-2yp_P0-RmQwh0AYAAp4YAAK7jeFIIagl5wZV8HApBA');
        ctx.replyWithSticker('CAACAgIAAxkBAAMZYtb2m7IKCoE-2yp_P0-RmQwh0AYAAp4YAAK7jeFIIagl5wZV8HApBA', {
            reply_to_message_id: ctx.msg.message_id
        });
    });

    bot.hears(/Dima/, (ctx) => {
        ctx.reply("You're *gay*",{ parse_mode: "MarkdownV2" });
    })
    
    bot.on('message', (ctx) => {
        ctx.reply('Nice to meet you');
        console.log(ctx.from);
        console.log(ctx.msg);
    })

    bot.start({
        onStart: (botInfo) => {
            console.log(botInfo);
        }
    });
})();