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

app.get('/style/style.css', function (req, res) {
  res.sendFile('/style/style.css', {root: __dirname})
})

app.get('/makebadge/:user/:repo', function (req, res) {
  let svg = ''
  request(`https://github.com/${req.params.user}/${req.params.repo}`, function (error, response, body) {
      if (response !== undefined && response.statusCode >= 400) {
        res.status(400).send('Invalid repository')
        return
      } else if (response === undefined) {
        res.status(400).send('There was an error')
        return
      }
      let info = githubInfo.getInfo(req.params.user, req.params.repo, function (error, result) {
        if (error) {
          res.status(400).send('Make sure repo is not empty')
          return
        }
        svg = githubSVG.createSVG(result)
        res.set('Content-Type', 'image/svg+xml')
        //res.set('Expires', new Date().toUTCString())
        //res.set('Cache-Control', 'max-age=60')
        let cacheSecs = 60;
        res.setHeader('Cache-Control', 'max-age=' + cacheSecs);
        let reqTime = new Date();
        let date = (new Date(+reqTime + cacheSecs * 1000)).toGMTString();
        res.setHeader('Expires', date);
        res.send(svg)
      })
    })
})

app.listen(process.argv[2], function () {
  console.log('running')
})
