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

app.get('/style/:file', function (req, res) {
  res.sendFile(`/style/${req.params.file}`, {root: __dirname})
})

app.get('/templates/GitHub-Mark.svg', function (req, res) {
  res.sendFile('/templates/GitHub-Mark.svg', {root: __dirname})
})

app.get('/makebadge/:user/:repo', function (req, res) {
  let svg = ''
  request(`https://github.com/${req.params.user}/${req.params.repo}`, function (error, response, body) {
      if (response === undefined) {
        res.status(400).send('There was an error')
        return
      }
      if (response.statusCode >= 400) {
        res.status(400).send('Invalid repository')
        return
      }
      let info = githubInfo.getInfo(req.params.user, req.params.repo, function (error, result) {
        svg = githubSVG.createSVG(result)
        res.set('Content-Type', 'image/svg+xml')
        res.send(svg)
      })
    })
})

app.listen(process.argv[2], function () {
  console.log('running')
})
