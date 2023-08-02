

const { Telegraf, session } = require('telegraf');
const axios = require('axios');
const { Pagination } = require('telegraf-pagination');

const bot = new Telegraf('6380374685:AAESXp51XC-DjO-vANd5XES4nivDvQCWGFM');
bot.use(session());


let nextCursor = 0;
bot.start(async (ctx) => {
    try {
        await ctx.reply("Rasm generatsiya qilinmoqda...")

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

        console.log(data.images.length, nextCursor);

        // await ctx.telegram.deleteMessage(ctx.session.previousChatId, ctx.session.previousMessageId);
        // ctx.session.previousMessageId = replyMessage.message_id;
        // ctx.session.previousChatId = ctx.chat.id;
    } catch (error) {
        ctx.reply(error.message);
    }
});




bot.on('message', async (ctx) => {
    const message = ctx.message;
    if (message.text && message.text.charAt(0) != '/') {
        await ctx.replyWithHTML(`Ushbu <b>${message.text}</b> so'z uchun rasm generatsiya qilinmoqda...`)
        const { data } = await axios.post('https://lexica.art/api/infinite-prompts', {
            text: message.text,
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
    }

    // Check if the message has a photo
    if (message.photo) {
        try {
            // Handle the photo
            const photo = message.photo;
            // 'photo' is an array of photo sizes, where the last item has the highest resolution
            const photoFileId = photo[photo.length - 1].file_id;
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
























































bot.catch(err => {
    console.log(err.message);
})

try {
    bot.launch();
    console.log('Bot is running');
} catch (error) {
    console.log('Error starting bot', error.message);
}


