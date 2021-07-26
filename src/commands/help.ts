import { Message } from 'discord.js'
import { Command } from '../interfaces/command'

export const Help: Command = {
  name: 'help',
  description: 'this is a help command',
  execute: (msg: Message) => {
    msg.channel.send('helped!')
  },
}
