import { Message } from 'discord.js'
import { Command } from '../interfaces/command'
import ytdl from 'ytdl-core'
import ytSearch from 'yt-search'
import { validURL } from '../utils/Functions'

export const Play: Command = {
  name: 'play',
  description: 'Plays the music',
  execute: (msg: Message, args: string[]) => {
    const voiceChannel = msg.member.voice.channel
    if (!voiceChannel) {
      return msg.channel.send(
        'You need to be in a channel to play start the party! :notes: :tada:'
      )
    }

    const permissions = voiceChannel.permissionsFor(msg.client.user)
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return msg.channel.send('You dont\'t have permission to call me! :cry:')
    }

    if (!args.length) {
      return msg.channel.send(
        'You need to pass a link or music name to start the party! :notes: :tada:'
      )
    }

    voiceChannel
      .join()
      .then(async (connection) => {
        const videoFinder = async (query: string) => {
          const videoResult = await ytSearch(query)
          return videoResult.videos.length > 1 ? videoResult.videos[0] : null
        }
        const video = await videoFinder(args.join(' '))

        if (validURL(args[0])) {
          const stream = ytdl(args[0], { filter: 'audioonly' })
          connection.play(stream, { seek: 0, volume: 1 }).on('finish', () => {
            voiceChannel.leave()
            msg.channel.send('Party is over, leaving now! :cry:')
          })

          await msg.reply(':notes: Now Playing')
        } else if (video) {
          const stream = ytdl(video.url, { filter: 'audioonly' })
          connection.play(stream, { seek: 0, volume: 1 }).on('finish', () => {
            voiceChannel.leave()
            msg.channel.send('Party is over, leaving now! :cry:')
          })

          await msg.reply(`:notes: Now Playing -> ***${video.title}***`)
        } else {
          msg.channel.send('No music found! :cry:')
        }
      })
      .catch((ex) => console.error('Error while trying to play music:', ex))
  },
}
