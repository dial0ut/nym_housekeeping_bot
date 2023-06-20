import dotenv from "dotenv";
import { Bot, session } from "grammy";
import { conversations } from "@grammyjs/conversations";
import handleStart from "./handlers/start.js";

dotenv.config();

async function runApp() {
  console.log("Starting app...");

  // Handler of all errors, in order to prevent the bot from stopping
  process.on("uncaughtException", function (exception) {
    console.log(exception);
  });

  // Initialize the bot
  const bot = new Bot(process.env.BOT_TOKEN);

  // Set the initial data of our session
  bot.use(session({ initial: () => ({ amount: 0, comment: "" }) }));
  // Install the conversation plugin
  bot.use(conversations());

  // Register all handelrs
  bot.command("start", handleStart);
  bot.callbackQuery("check", async (ctx) => {
    await ctx.conversation.enter("checkMixnodeInformation");
  });


  // Start bot
  await bot.init();
  bot.start();
  console.info(`Bot @${bot.botInfo.username} is up and running`);
}

void runApp();