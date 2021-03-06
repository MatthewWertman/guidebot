module.exports = (client) => {

    client.permlevel = message => {
        let permlvl = 0;

        const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

        while (permOrder.length) {
            const currentLevel = permOrder.shift();
            if (message.guild && currentLevel.guildOnly) continue;
            if (currentLevel.check(message)) {
                permlvl = currentLevel.level;
                break;
            }
        }
        return permlvl;
    };

    client.awaitReply = async (msg, question, limit = 60000) => {
        const filter = m => m.author.id === msg.author.id;
        await msg.channel.send(question);
        try {
            const collected = await msg.channel.awaitMessages(filter, {
                max: 1,
                time: limit,
                errors: ["time"]
            });
            return collected.first().content;
        } catch (e) {
            return false;
        }
    };

    client.clean = async (client, text) => {
        if (text && text.constructor.name == "Promise")
            text = await text;
        if (typeof text !== "string")
            text = require("util").inspect(text, {
                depth: 1
            });

        text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

        return text;
    };

    client.reload = command => {
        return new Promise((resolve, reject) => {
            try {
                delete require.cache[require.resolve(`../commands/${command}`)];
                const cmd = require(`../commands/${command}`);
                client.commands.delete(command);
                client.aliases.forEach((cmd, alias) => {
                    if (cmd === command) client.aliases.delete(alias);
                });
                client.commands.set(command, cmd);
                cmd.conf.aliases.forEach(alias => {
                    client.aliases.set(alias, cmd.help.name);
                });
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    };

    client.unloadCommand = async (commandName) => {
        let command;
        if (client.commands.has(commandName)) {
            command = client.commands.get(commandName);
        } else if (client.aliases.has(commandName)) {
            command = client.commands.get(client.aliases.get(commandName));
        }
        if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

        if (command.shutdown) {
            await command.shutdown(client);
        }
        const mod = require.cache[require.resolve(`../commands/${command.help.name}`)];
        delete require.cache[require.resolve(`../commands/${command.help.name}.js`)];
        for (let i = 0; i < mod.parent.children.length; i++) {
            if (mod.parent.children[i] === mod) {
                mod.parent.children.splice(i, 1);
                break;
            }
        }
        return false;
    };

    Object.defineProperty(String.prototype, "toProperCase", {
        value: function() {
            return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        }
    });

    // <Array>.random() returns a single random element from an array
    // [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5.
    Object.defineProperty(Array.prototype, "random", {
        value: function() {
            return this[Math.floor(Math.random() * this.length)];
        }
    });

    // <Number>.formatDuration() returns a duration in dd:hh:mm:ss format
    // <Number> is treated in milliseconds
    Object.defineProperty(Number.prototype, "formatDuration", {
        value: function () {
            let d = Number(this);
            const ms = d % 1000;
            d = (d - ms) / 1000;
            const secs = d % 60;
            d = (d - secs) / 60;
            const mins = d % 60;
            d = (d - mins) / 60;
            const hrs = d % 24;
            const days = (d - hrs) / 24;
            
            function pad(n,z) {
                z = z || 2;
                return ("00" + n).slice(-z);
            }

            // dd:hh:mm:ss
            return pad(days) + ":" + pad(hrs) + ":" + pad(mins) + ":" + pad(secs);
        }
    });

    // `await client.wait(1000);` to "pause" for 1 second.
    client.wait = require("util").promisify(setTimeout);

    // These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
    process.on("uncaughtException", (err) => {
        const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
        console.log(`Uncaught Exception: ${errorMsg}`);
        console.error(err);
        // Always best practice to let the code crash on uncaught exceptions.
        // Because you should be catching them anyway.
        process.exit(1);
    });

    process.on("unhandledRejection", err => {
        console.log(`Unhandled rejection: ${err}`);
        console.error(err);
    });
};
