class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService
    this._mailSender = mailSender

    this.listen = this.listen.bind(this)
  }

  async listen(message) {
    try {
      console.log('Received message:', message.content.toString()); // Menampilkan pesan sebelum pem-parsing
      const { playlistId, targetEmail } = JSON.parse(message.content.toString())

      const playlists = await this._playlistsService.getPlaylists(playlistId)
      const result = await this._mailSender.sendMail(targetEmail, JSON.stringify(playlists))

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Listener