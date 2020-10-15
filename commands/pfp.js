exports.run = (client, message, args, level) => { //eslint-disable-line no-unused-vars
    if (!message.mentions.users.size) return message.channel.send(`Your avatar: ${message.author.displayAvatarURL()}`);
    const avatarList = message.mentions.users.map(user => {
        return `${user.username}'s avatar: ${user.displayAvatarURL()}`;
    });
    message.channel.send(avatarList);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "pfp",
    category: "Miscellaneous",
    description: "Sends a link of your avatar",
    usage: "pfp [member]",
    aliases: []
};
