const config = require("../config.js");
const Discord = require("discord.js");

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message, client) {
    if (message.author.bot) return;
    if (message.channel.id !== '997002358657667112') return;
        
    message.delete();
        
    if (message.attachments.size === 0) {
      if (!message.content.includes("https://") && !message.content.includes("http://")) return message.channel.send("<:icons_Wrong:995545123142254612> | You must upload evidence.").then(msg => { setTimeout(() => { msg.delete(); }, 10000); });
    }
    if (message.attachments.size >= 2) return message.channel.send("<:icons_Wrong:995545123142254612> | You can only submit 1 attachment.").then(msg => { setTimeout(() => { msg.delete(); }, 10000); });
    if (message.content == "") return message.channel.send("<:icons_Wrong:995545123142254612> | You must include the offender's IGN and rule broken.").then(msg => { setTimeout(() => { msg.delete(); }, 10000); });
        
    else {
      const button = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton().setCustomId("accept_report").setLabel("Accept").setStyle("SUCCESS"),
        new Discord.MessageButton().setCustomId("deny_report").setLabel("Deny").setStyle("DANGER")
      );

      message.channel.send("<:icons_Correct:995546257923768380> | Thank you! Your report has been successfully recorded and been forwarded to the staff team.").then(msg => { setTimeout(() => { msg.delete(); }, 10000); });
      client.channels.cache.get('997002389804548186').send({ embeds: [new Discord.MessageEmbed().setTitle("<:icons_folder:995548354530517142> New Player Report").setColor(0xffcd00).setDescription(`Submitted by: ${message.author.tag}\n\nDetails:\n${message.content}\n\nStatus: -`).setFooter(message.author.id)], components: [button] }).then(msg => {
        if (message.attachments.size !== 0) {
          msg.reply({ "content": "Evidence:", "files": message.attachments.map(attachment => attachment.url) });
        } else {
          const matches = message.content.match(/\bhttps?:\/\/\S+/gi);
          msg.reply({ "content": `Evidence: ${matches.toString()}` });
        }
      });
    }
  }
};