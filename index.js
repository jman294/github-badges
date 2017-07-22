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
  //let info = githubInfo.getInfo(req.params.user, req.params.repo, function (contributors) {
    //if (contributors === false) {
      //return
    //}
    //svg = githubSVG.createSVG(contributors)
  //})
  svg = githubSVG.createSVG(Math.random())
  res.set('Content-Type', 'image/svg+xml')
  res.send(svg)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
