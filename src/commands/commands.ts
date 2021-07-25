import { Message, OverridableManager } from "discord.js";
import Discord from 'discord.js'
import { Command } from "../interfaces/command";

export const Commands: Command =  {
    name: 'commands',
    description: 'shows up a list of commands',
    execute: (msg: Message, args: string[]) => {
        const embed = new Discord.MessageEmbed()
        .setColor('#ffbf00')
        .setTitle('Commands')
        .setDescription('This is a embed message to show up a list of commands')
        .addFields(
            {name: '-github', value: 'Deixa uma estrelinha ai'},
            {name: '-help', value: 'Exibe opções para ajuda'},
            {name: '-ping', value: 'Easter Egg de desenvolvimento'},
            {name: '-commands', value: 'Exibe essa caixa de comandos'},
        )
        .setFooter('Use wisely')
        
        msg.channel.send(embed)
    }
}