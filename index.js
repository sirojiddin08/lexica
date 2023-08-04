const { Telegraf, session } = require('telegraf');
const axios = require('axios');
const { Pagination } = require('telegraf-pagination');

const bot = new Telegraf('6380374685:AAGaYkJxwilzsFTFfVil_L4BJpq1x9HPUaQ');
bot.use(session());

var startImage = 0;
var numberImage = 4;
var globalPhotos;

let nextCursor = 0;
bot.start(async (ctx) => {
    try {
        await ctx.reply("Ushbu bot sizga matnlaringiz uchun rasm chizib beradi, yoki shunchaki rasm yuboring va u sizga mos tarzda rasm qaytaradi!")
        const { data } = await axios.post('https://lexica.art/api/infinite-prompts', {
            text: "",
            searchMode: "images",
            source: "search",
            cursor: nextCursor,
            model: "lexica-aperture-v2"
        });

        console.log(data.images[0]);

        const images = [
            { type: 'photo', media: `https://image.lexica.art/md2/${data.images[0].id}` },
            { type: 'photo', media: `https://image.lexica.art/md2/${data.images[1].id}` },
            { type: 'photo', media: `https://image.lexica.art/md2/${data.images[2].id}` },
            { type: 'photo', media: `https://image.lexica.art/md2/${data.images[3].id}` },
            { type: 'photo', media: `https://image.lexica.art/md2/${data.images[4].id}` },
            { type: 'photo', media: `https://image.lexica.art/md2/${data.images[5].id}` },
            { type: 'photo', media: `https://image.lexica.art/md2/${data.images[6].id}` },
            { type: 'photo', media: `https://image.lexica.art/md2/${data.images[7].id}` },
            { type: 'photo', media: `https://image.lexica.art/md2/${data.images[8].id}` },
            { type: 'photo', media: `https://image.lexica.art/md2/${data.images[9].id}` }
        ];

        await ctx.replyWithMediaGroup(images);
    } catch (error) {
        ctx.reply(error.message);
    }
});

bot.on('message', async (ctx) => {
    const message = ctx.message;
    if (message.text && message.text.charAt(0) != '/') {
        const message1 = await ctx.replyWithHTML(`Ushbu <b>${message.text}</b> so'z uchun rasm generatsiya qilinmoqda...`)
        const { data } = await axios.post('https://lexica.art/api/infinite-prompts', {
            text: message.text,
            searchMode: "images",
            source: "search",
            cursor: 0,
            model: "lexica-aperture-v2"
        });

        globalPhotos = data.images.map(elm => ({ type: 'photo', media: `https://image.lexica.art/md2/${elm.id}` }));
        const replyPhoto = await ctx.replyWithMediaGroup(globalPhotos.slice(startImage, numberImage));

        // await ctx.replyWithHTML(`<b>Natijalar ${startImage + 1} - ${numberImage} gacha. Jami ${data.images.length} ta dan</b>`, {
        //     reply_markup: {
        //         inline_keyboard: [
        //             [
        //                 { text: "⬅️", callback_data: "prev" },
        //                 { text: "❌", callback_data: "cancel" },
        //                 { text: "➡️", callback_data: "next" },
        //             ]
        //         ]
        //     }
        // })
        // ctx.session.message1 = message1.message_id;
        // ctx.session.replyPhoto = replyPhoto.map(elm => elm.message_id);
        // ctx.session.previousChatId = ctx.chat.id;
    }

    // Check if the message has a photo
    if (message.photo) {
        try {
            await ctx.reply("Rasm generatsiya qilinmoqda...")
            // Handle the photo
            const photo = message.photo;
            // 'photo' is an array of photo sizes, where the last item has the highest resolution
            const photoFileId = photo[photo.end - 1].file_id;
            const photoFile = await ctx.telegram.getFile(photoFileId);

            // Get the download link for the photo
            const photoUrl = `https://api.telegram.org/file/bot6380374685:AAESXp51XC-DjO-vANd5XES4nivDvQCWGFM/${photoFile.file_path}`;
            const { data } = await axios.post('https://lexica.art/api/infinite-prompts', {
                text: photoUrl,
                searchMode: "images",
                source: "search",
                cursor: 50,
                model: "lexica-aperture-v2"
            });

            const images = [
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[0].id}` },
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[1].id}` },
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[2].id}` },
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[3].id}` },
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[4].id}` },
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[5].id}` },
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[6].id}` },
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[7].id}` },
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[8].id}` },
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[9].id}` }
            ];
            await ctx.replyWithMediaGroup(images);

        } catch (error) {
            console.error('Error:', error.message);
            ctx.reply('Error uploading photo. Please try again later.');
        }
    }

    // Check if the message has a document
    if (message.document) {
        try {
            await ctx.reply("Rasm generatsiya qilinmoqda...")
            const document = message.document;
            const documentFileId = document.file_id;
            const documentFile = await ctx.telegram.getFile(documentFileId);

            // Get the download link for the document
            const documentUrl = `https://api.telegram.org/file/bot6380374685:AAESXp51XC-DjO-vANd5XES4nivDvQCWGFM/${documentFile.file_path}`;
            const { data } = await axios.post('https://lexica.art/api/infinite-prompts', {
                text: documentUrl,
                searchMode: "images",
                source: "search",
                cursor: 50,
                model: "lexica-aperture-v2"
            });

            const images = [
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[0].id}` },
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[1].id}` },
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[2].id}` },
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[3].id}` },
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[4].id}` },
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[5].id}` },
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[6].id}` },
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[7].id}` },
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[8].id}` },
                { type: 'photo', media: `https://image.lexica.art/md2/${data.images[9].id}` }
            ];
            await ctx.replyWithMediaGroup(images);

        } catch (error) {
            console.error('Error:', error.message);
            ctx.reply('Error uploading photo. Please try again later.');
        }
    }
});



bot.action('cancel', async ctx => {
    ctx.answerCbQuery();

    ctx.session.replyPhoto.forEach(async element => {
        await ctx.telegram.deleteMessage(ctx.session.previousChatId, element);
    });
    // await ctx.telegram.deleteMessage(ctx.session.previousChatId, ctx.session.previousMessageId);
    // await ctx.telegram.deleteMessage(ctx.session.previousChatId, ctx.session.message1);
})

bot.action('next', async ctx => {
    ctx.answerCbQuery();
    
    await ctx.replyWithMediaGroup(globalPhotos.slice(startImage + numberImage, numberImage));
    console.log(globalPhotos.slice(0, 2));
})













bot.catch(err => {
    console.log(err.message);
})

try {
    bot.launch();
    console.log('Bot is running');
} catch (error) {
    console.log('Error starting bot', error.message);
}