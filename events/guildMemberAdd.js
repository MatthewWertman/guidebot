const config = require("../config.js");
module.exports = (client, member) => {
    // If welcome is off, don't proceed (don't welcome the user)
    if (config.defaultSettings.welcomeEnabled !== "true") return;

    // Replace the placeholders in the welcome message with actual data
    const welcomeMessage = config.defaultSettings.welcomeMessage.replace("{{user}}", member.user.tag);
    member.guild.channels.cache.find(c => c.name === config.defaultSettings.welcomeChannel).send(welcomeMessage).catch(console.error);
};
