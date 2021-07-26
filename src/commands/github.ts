import { Message } from 'discord.js'
import { Command } from '../interfaces/command'
import { Links } from '../utils/Constants'

export const Github: Command = {
  name: 'github',
  description: 'this command show github`s link',
  execute: (msg: Message) => {
    msg.channel.send(Links.githubProjectLink)
  },
}
