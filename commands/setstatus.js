exports.run = (client, message, args, level) => { //eslint-disable-line no-unused-vars
    if (!args[0] && args.length === 0) return message.channel.send(`USAGE: ${exports.help.usage}`);
    var result = args.join(" ");
    if (!result) {
        result = "online";
    }
    client.user.setStatus(result);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["setStat", "ss"],
    permLevel: "Bot Owner"
};

exports.help = {
    name: "setstatus",
    category: "Config",
    description: "sets the bot's current state",
    usage: "setstatus <status>",
    aliases: ["setStat", "ss"]
};
