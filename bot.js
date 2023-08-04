const { Telegraf } = require("telegraf");
const { Markup } = Telegraf;
const { Pagination } = require("telegraf-pagination");

const TOKEN = "6380374685:AAESXp51XC-DjO-vANd5XES4nivDvQCWGFM";
const bot = new Telegraf(TOKEN);

let fakeData = Array(10)
    .fill(0)
    .map((_, i) => ({
        id: i,
        title: `Item ${i + 1}`,
    }));

console.log(fakeData);
bot.command("pagination", async (ctx) => {
    const pagination = new Pagination({
        data: fakeData, // array of items
        header: (currentPage, pageSize, total) =>
            `${currentPage}-page of total ${total}`, // optional. Default value: 👇
        // `Items ${(currentPage - 1) * pageSize + 1 }-${currentPage * pageSize <= total ? currentPage * pageSize : total} of ${total}`;
        format: (item, index) => `${index + 1}. ${item.title}`, // optional. Default value: 👇
        // `${index + 1}. ${item}`;
        pageSize: 8, // optional. Default value: 10
        rowSize: 4, // optional. Default value: 5 (maximum 8)
        isButtonsMode: false, // optional. Default value: false. Allows you to display names on buttons (there is support for associative arrays)
        buttonModeOptions: {
            isSimpleArray: true, // optional. Default value: true. Enables/disables support for associative arrays
            titleKey: "", // optional. Default value: null. If the associative mode is enabled (isSimply: false), determines by which key the title for the button will be taken.
        },
        isEnabledDeleteButton: true, // optional. Default value: true
        onSelect: (item, index) => {
            ctx.reply(item.title);
        }, // optional. Default value: empty function
        messages: {
            // optional
            firstPage: "First page", // optional. Default value: "❗️ That's the first page"
            lastPage: "Last page", // optional. Default value: "❗️ That's the last page"
            prev: "◀️", // optional. Default value: "⬅️"
            next: "▶️", // optional. Default value: "➡️"
            delete: "🗑", // optional. Default value: "❌"
        },
        inlineCustomButtons: [
            [Markup.callbackButton('Title custom button', 'your_callback_name')]
        ] // optional. Default value: null
    });

    pagination.handleActions(bot); // pass bot or scene instance as a parameter

    let text = await pagination.text(); // get pagination text
    let keyboard = await pagination.keyboard(); // get pagination keyboard
    ctx.replyWithHTML(text, keyboard);
});

bot.launch().then(() => {
    console.log("Bot is running");
});
