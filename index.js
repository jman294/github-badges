const request = require('request')
const githubSVG = require('./js/githubSVG')
const githubInfo = require('./js/githubInfo')
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.sendFile('/index.html', {root: __dirname})
})

app.get('/js/client.js', function (req, res) {
  res.sendFile('/js/client.js', {root: __dirname})
})

app.get('/makebadge/:user/:repo', function (req, res) {
  let svg = ''
  request(`https://github.com/${req.params.user}/${req.params.repo}`, function (error, response, body) {
      if (response.statusCode >= 400) {
        res.status(400).end()
        return
      }
      let info = githubInfo.getInfo(req.params.user, req.params.repo, function (error, result) {
        svg = githubSVG.createSVG(result)
        res.set('Content-Type', 'image/svg+xml')
        res.send(svg)
      })
    })
})

app.listen(3000, function () {
})
