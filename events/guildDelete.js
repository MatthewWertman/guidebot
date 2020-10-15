module.exports = (client, guild) => {
    if (!guild.available) return; // If there is an outage, return.
    console.log(`[GUILD LEAVE] ${guild.name} (${guild.id}) removed the bot.`);
};
