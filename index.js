if (Number(process.version.slice(1).split(".")[0]) < 12) throw new Error("Node 12.0.0 or higher is required. Update Node on your system.");

const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const config = require("./config.js");
const client = new Discord.Client({
    ws: {
        intents: config.intents
    }
});
client.config = config;
require("./modules/functions.js")(client);

const init = async () => {
    //Commands
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    const cmdFiles = await readdir("./commands/");
    console.log(`Loading a total of ${cmdFiles.length} commands.`);
    cmdFiles.forEach(f => {
        const props = require(`./commands/${f}`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
    //Events
    const evtFiles = await readdir("./events/");
    console.log(`Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        const event = require(`./events/${file}`);
        client.on(eventName, event.bind(null, client));
    });
    //Level Cache
    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
        const thisLevel = client.config.permLevels[i];
        client.levelCache[thisLevel.name] = thisLevel.level;
    }

    client.on("warn", console.warn);
    client.on("error", console.error);

    client.login(client.config.token);
};

init();
