import 'dotenv/config'
import fs from 'fs'
import { DiscordManager } from './class/DiscordManager'
import { Queue } from './namespaces/Queue'
import { Commands } from './commands/commands'
import { Github } from './commands/github'
import { Help } from './commands/help'
import { Leave } from './commands/leave'
import { Pause } from './commands/pause'
import { Ping } from './commands/ping'
import { Play } from './commands/play'
import { Stream } from './commands/stream'

try {
  const { BOT_TOKEN, PREFIX } = process.env
  const manager = new DiscordManager()
  const client = manager.client
  const commands = manager.commands
  const queue = Queue.queueList

  const commandFiles = fs.readdirSync('./src/commands/')

  commandFiles.forEach((file) => {
    // TODO: find out why this shit doesn't work and replace switch(cmd) with foreach
    const command = require(`./commands/${file}`)
    commands.set(command.name, command)
  })

  if (!BOT_TOKEN) {
    console.error('Invalid Token, please verify!')
    process.exit(1)
  }

  if (client) {
    client.on('ready', () => {
      client.user.setActivity('Streaming on')
    })

    client.on('message', (msg) => {
      if (!msg.content.startsWith(PREFIX) || msg.author.bot) {
        return
      }

      const args = msg.content.slice(PREFIX.length).split(/ +/)
      const cmd = args.shift().toLowerCase()

      if (cmd === 'play' || cmd === 'stream') {
        console.log('first size -> ', Queue.queueList.length)
        if (Queue.queueList.length >= 1) {
          Queue.isPlaying = true
        } else {
          Queue.isPlaying = false
        }
        Queue.queueList.push({
          url: args.join(' '),
          isPlaying: Queue.isPlaying,
        })
        msg.channel.send('Added to queue!')
      }

      switch (cmd) {
        case 'ping':
          Ping.execute(msg, args)
          break
        case 'help':
          Help.execute(msg, args)
          break
        case 'github':
          Github.execute(msg, args)
          break
        case 'commands':
          Commands.execute(msg, args)
          break
        case 'play':
          Play.execute(msg, args)
          break
        case 'stream':
          Stream.execute(msg, args)
          break
        case 'pause':
          Pause.execute(msg, args)
          break
        case 'leave':
          Leave.execute(msg, args)
          break
      }
    })

    client.login(BOT_TOKEN)
  }
} catch (ex) {
  console.error('Exception: ', ex)
}
