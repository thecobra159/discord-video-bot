import Discord from 'discord.js'
import { Command } from '../interfaces/command'

export class DiscordManager {
  client: Discord.Client
  commands: Discord.Collection<string, Command>

  constructor() {
    this.client = new Discord.Client()
    this.commands = new Discord.Collection()
  }
}
