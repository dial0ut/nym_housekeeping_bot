import { InlineKeyboard } from "grammy";

export default async function handleStart(ctx) {
  const menu = new InlineKeyboard()
    .text("Check if the node is active", "check")
    .row()
    .text("Subscribe to notifications to warn if node is inactive", "notifications")
    .row()
    .text("Mixnode info", "showMixnode")
    .row()
    .text("List of updated NYM events", "show events")
    .row()
    .text("Set reminders for node housekeeping", "setReminders")
    .row()
    .url("Nym mixnode explorer", "https://explorer.nymtech.net");

  await ctx.reply(
    `Hello stranger!
Welcome to the Nym housekeeping bot! <tg-spoiler>and much more! #privacylovescompany</tg-spoiler>`,
    { reply_markup: menu, parse_mode: "HTML" }
  );
  
  await ctx.reply("Please enter your mixnode number (the one in Nym explorer):");

  // Set the session state to "waitingForId"
  ctx.session.state = "waitingForId";
}
