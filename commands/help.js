const {MessageEmbed} = require("discord.js");
exports.run = (client, message, args, level) => {
    if (!args[0]) {
    // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
        const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

        const commandNames = myCommands.keyArray();
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

        let currentCategory = "";
        var embed = new MessageEmbed()
            .setColor(0xff0000)
            .setTitle(`= Command List =\n\n[Use ${client.config.defaultSettings.prefix}help <commandname> for details]\n`);
        const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
        sorted.forEach( c => {
            const cat = c.help.category.toProperCase();
            if (currentCategory !== cat) {
                embed.addField(`\u200b\n== ${cat} ==\n`, "\u200b");
                currentCategory = cat;
            }
            embed.addField(`${client.config.defaultSettings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)}`, `${c.help.description}`);
        });
        //embed.setFooter(`Sent by RollBot aww yeah 😎`, "https://cdn.discordapp.com/avatars/309863276383174656/eabae49bc31e7fb5a44f01199ee6f14b.png")
        message.author.send(embed);
    } else {
        // Show individual command's help.
        let command = args[0];
        if (client.commands.has(command)) {
            command = client.commands.get(command);
            if (level < client.levelCache[command.conf.permLevel]) return message.channel.send("You don't have permission to run the `${command.help.name}` command");
            embed = new MessageEmbed()
                .setColor(0xff0000)
                .setTitle(`${command.help.name.toUpperCase()}`)
                .addField(`${command.help.description}`, `aliases: ${command.help.aliases.join(", ")}\nusage: ${command.help.usage}`);
            message.channel.send(embed);
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["h", "halp"],
    permLevel: "User"
};

exports.help = {
    name: "help",
    category: "System",
    description: "Displays all the available commands for your permission level.",
    usage: "help [command]"
};
