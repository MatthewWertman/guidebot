exports.run = (client, message, args, level) => { //eslint-disable-line no-unused-vars
    if (!args[0] && args.length === 0) return message.channel.send(`Please input text. USAGE: ${exports.help.usage}`);
    let channel;
    //var guild = client.guilds.cache.get(config.guildID);
    var text = args.slice(1, args.length).join(" ");

    if (!message.mentions.channels.size) {
        channel = message.guild.channels.cache.find(ch => ch.name === args[0]);
    } else if (message.mentions.channels.size > 1) {
        return message.channel.send("You may only mention one channel at a time");
    } else if (message.mentions.channels.size === 1) {
        channel = message.mentions.channels.first();
    }
    if (!channel) {
        message.channel.send("Sending message in current channel...")
            .then(msg => {
                msg.edit(`${args.join(" ")}`);
            })
            .catch(console.error);
    } else {
        channel.send(text);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ec"],
    permLevel: "User"
};

exports.help = {
    name: "echo",
    category: "Miscellaneous",
    description: "repeats what you say",
    usage: "echo [channel] <text>",
    aliases: ["ec"]
};
