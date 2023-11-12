// @ts-check

require('dotenv').config();

const amqp = require('amqplib');

const Listener = require('./Listener');
const MailSender = require('./MailSender');
const PlaylistsService = require('./PlaylistsService');

const init = async () => {
  const mailSender = new MailSender()
  const playlistsService = new PlaylistsService()
  const listener = new Listener(playlistsService, mailSender)

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER)
  const channel = await connection.createChannel()

  await channel.assertQueue('export:playlists', { durable: true })

  channel.consume('export:playlists', listener.listen, { noAck: true })
}

init()