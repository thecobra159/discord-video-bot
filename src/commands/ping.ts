import { Message } from "discord.js";
import { Command } from "../interfaces/command";

export const Ping: Command =  {
    name: 'ping',
    description: 'this is a ping command',
    execute: (msg: Message, args: string[]) => {
        msg.channel.send('pong!')
    }
}