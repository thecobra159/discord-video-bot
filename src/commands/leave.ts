import { Message } from 'discord.js'
import { Command } from '../interfaces/command'

export const Leave: Command = {
  name: 'leave',
  description: 'Leave the room',
  execute: (msg: Message) => {
    const voiceChannel = msg.member.voice.channel
    if (!voiceChannel) {
      return msg.channel.send(
        'You need to be in a channel to play start the party! :notes: :tada:'
      )
    }

    voiceChannel.leave()
    msg.channel.send('Leaving party room! :tada:')
  },
}
