const { ZingMp3 } = require("zingmp3-api-full-v3")

class ZingController {

  getSong(req, res) {
    ZingMp3.getSong(req.query.id).then((data) => {
      res.json(data)
    })
  }

  getDetailPlaylist(req, res) {
    ZingMp3.getDetailPlaylist(req.query.id).then((data) => {
      res.json(data)
    })
  }

  getHome(req, res) {
    ZingMp3.getHome().then((data) => {
      res.json(data)
    })
  }

  getTop100(req, res) {
    ZingMp3.getTop100().then((data) => {
      res.json(data);
    })
  }

  getChartHome(req, res) {
    ZingMp3.getChartHome().then((data) => {
      res.json(data);
    })
  }

  getNewReleaseChart(req, res) {
    ZingMp3.getNewReleaseChart().then((data) => {
      res.json(data)
    })
  }

  getInfo(req, res) {
    ZingMp3.getInfoSong(req.query.id).then((data) => {
      res.json(data);
    })
  }

  getArtist(req, res) {
    ZingMp3.getArtist(req.query.name).then((data) => {
      res.json(data)
    })
  }

  getArtistSong(req, res) {
    ZingMp3.getListArtistSong(req.query.id, req.query.page, req.query.count).then((data) => {
      res.json(data)
    })
  }
  getListArtistPlaylist(req, res) {
    ZingMp3.getListArtistPlaylist(req.query.id, req.query.page, req.query.count).then((data) => {
      res.json(data)
    })
  }
  getSongsByArtistName(req, res) {
    ZingMp3.getSongsByArtistName(req.query.name, req.query.page, req.query.count).then((data) => {
      res.json(data)
    })
  }
  getPlaylistsByArtistName(req, res) {
    ZingMp3.getPlaylistsByArtistName(req.query.name, req.query.page, req.query.count).then((data) => {
      res.json(data)
    })
  }
  getVideosByArtistName(req, res) {
    ZingMp3.getVideosByArtistName(req.query.name, req.query.page, req.query.count).then((data) => {
      res.json(data)
    })
  }
  getLyric(req, res) {
    ZingMp3.getLyric(req.query.id).then((data) => {
      res.json(data)
    })
  }

  search(req, res) {
    ZingMp3.search(req.query.keyword).then((data) => {
      res.json(data)
    })
  }

  getListMV(req, res) {
    ZingMp3.getListMV(req.query.id, req.query.page, req.query.count).then((data) => {
      res.json(data)
    })
  }

  getCategoryMV(req, res) {
    ZingMp3.getCategoryMV(req.query.id).then((data) => {
      res.json(data)
    })
  }

  getVideo(req, res) {
    ZingMp3.getVideo(req.query.id).then((data) => {
      res.json(data)
    })
  }
  getSuggest()
  {
    ZingMp3.Suggest().then((data) => {
      res.json(data)
    })
  }

}

module.exports = new ZingController
