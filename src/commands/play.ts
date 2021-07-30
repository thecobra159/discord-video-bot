import { Message } from 'discord.js'
import { Command } from '../interfaces/command'
import ytdl from 'ytdl-core'
import ytSearch from 'yt-search'
import { validURL } from '../utils/Functions'
import { Queue } from '../namespaces/Queue'

export const Play: Command = {
  name: 'play',
  description: 'Plays the music',
  execute: (msg: Message, args: string[]) => {
    const queue = Queue.queueList
    const voiceChannel = msg.member.voice.channel
    if (!voiceChannel) {
      return msg.channel.send(
        'You need to be in a channel to play start the party! :notes: :tada:'
      )
    }

    const permissions = voiceChannel.permissionsFor(msg.client.user)
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return msg.channel.send("I dont't have permission to play! :cry:")
    }

    if (!args.length) {
      return msg.channel.send(
        'You need to pass a link or music name to start the party! :notes: :tada:'
      )
    }

    queue.forEach(
      (music, index) => console.log(`music ${index} -> ${music.url}`),
      queue.length
    )

    voiceChannel
      .join()
      .then(async (connection) => {
        const videoFinder = async (query: string) => {
          const videoResult = await ytSearch(query)
          return videoResult.videos.length > 1 ? videoResult.videos[0] : null
        }
        const currentInQueue = queue[0].url

        if (validURL(currentInQueue)) {
          const stream = ytdl(currentInQueue, { filter: 'audioonly' })
          connection.play(stream, { seek: 0, volume: 1 }).on('finish', () => {
            if (queue.length >= 1) {
              queue.shift()
              Play.execute(msg, args)
              msg.channel.send('Party is not over! :tada:')
            } else {
              Queue.isPlaying = false
              voiceChannel.leave()
              msg.channel.send('Party is over, leaving now! :cry:')
            }
          })

          await msg.reply(':notes: Now Playing')
        } else if (currentInQueue) {
          const video = await videoFinder(currentInQueue)
          const stream = ytdl(video.url, { filter: 'audioonly' })
          connection.play(stream, { seek: 0, volume: 1 }).on('finish', () => {
            if (queue.length >= 1) {
              queue.shift()
              Play.execute(msg, args)
              msg.channel.send('Party is not over! :tada:')
            } else {
              Queue.isPlaying = false
              voiceChannel.leave()
              msg.channel.send('Party is over, leaving now! :cry:')
            }
          })

          await msg.reply(`:notes: Now Playing -> ***${video.title}***`)
        } else {
          msg.channel.send('No music found! :cry:')
        }
      })
      .catch((ex) => console.error('Error while trying to play music:', ex))
  },
}
