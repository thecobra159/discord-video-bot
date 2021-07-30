import { Message } from 'discord.js'
import { Command } from '../interfaces/command'
import { MusicQueue } from '../interfaces/MusicQueue'

export const Pause: Command = {
  name: 'pause',
  description: 'Pause music',
  execute: (msg: Message, args: string[]) => {
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
