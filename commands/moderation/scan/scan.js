const commandInfo = {
  primaryName: "scan", // This is the command name used by help.js (gets uppercased).
  possibleTriggers: ["scan", "alias2", "alias3"], // These are all commands that will trigger this command.
  help: "eats your cake!", // This is the general description of the command.
  aliases: ["alias2", "alias3"], // These are command aliases that help.js will use
  usage: "[COMMAND] <required> [optional]", // [COMMAND] gets replaced with the command and correct prefix later
  category: "mod",
};

async function runCommand(message, args, RM) {
  return;
  //Check if command is disabled
  if (!require("../../../config.js").cmdScan) {
    return message.channel.send(
      new RM.Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription("Command disabled by Administrators.")
        .setThumbnail(message.guild.iconURL())
        .setTitle("Command Disabled")
    );
  }
  if (!RM.botOwners.includes(message.author.id)) return;

  // cmd stuff here
  function scanChannel(prompt) {
    return new Promise((fulfill, reject) => {
      try {
        let channel = RM.client.channels.cache.get(prompt.channel.id);
        let messages = [];
        scanChannelLoop(channel, messages, prompt.id).then((result) => {
          let encoded = encodeChannel(result);
          let dir = "./" + prompt.guild.id;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          fs.writeFileSync(dir + "/" + prompt.channel.id + ".txt", encoded);
          fulfill("Finished with " + result.length);
        });
      } catch (e) {
        fulfill(e.stack.toString());
      }
    });
  }
  message.channel.send("Scanning channel...");
  scanChannel(message)
    .then((result) => {
      message.channel.send(result);
    })
    .catch((e) => {
      message.channel.send(e);
    });
}

function commandTriggers() {
  return commandInfo.possibleTriggers;
}
function commandPrim() {
  return commandInfo.primaryName;
}
function commandAliases() {
  return commandInfo.aliases;
}
function commandHelp() {
  return commandInfo.help;
}
function commandUsage() {
  return commandInfo.usage;
}
function commandCategory() {
  return commandInfo.category;
}
module.exports = {
  runCommand,
  commandTriggers,
  commandHelp,
  commandAliases,
  commandPrim,
  commandUsage,
  commandCategory,
}; /* */ /* */ /* */ /* */ /* */ /* */ /* */ /* */ /* */ /* */ /* */

/* */
/* */
/* */
/*
------------------[Instruction]------------------

1. Make a directory in commands/ with your command name
2. Inside that directory, make a "<command name>.js" file
3. Copy the contents of TEMPLATE.js and paste it in the <command name>.js file and modify it to your needs.
4. In index.js add to the top:
"const cmd<cmdNameHere> = require('./commands/<command name>/<command name>.js');" at the top.

-------------------------------------------------

To get all possible triggers, from index.js call
"cmd<cmdname>.commandTriggers()"

To call the command, from index.js call
"cmd<cmdname>.runCommand(message, arguments, requiredModules);"

To check if possible triggers has the command call
"cmd<cmdname>.commandTriggers().includes(command)"

------------------[Instruction]------------------
*/
/* */
/* */
