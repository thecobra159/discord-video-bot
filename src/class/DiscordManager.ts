import Discord, { Guild } from 'discord.js'
import { Command } from '../interfaces/command'
import { MusicQueue } from '../interfaces/MusicQueue'

export class DiscordManager {
  client: Discord.Client
  commands: Discord.Collection<string, Command>

  constructor() {
    this.client = new Discord.Client()
    this.commands = new Discord.Collection()
  }
}
