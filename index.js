const request = require('request')
const largeBadge = require('./js/large')
const mediumBadge = require('./js/medium')
const smallBadge = require('./js/small')
const githubInfo = require('./js/githubInfo')
const express = require('express')
const sslRedirect = require('heroku-ssl-redirect')
const app = express()

app.use(sslRedirect())

app.get('/', function (req, res) {
  res.sendFile('/index.html', {root: __dirname})
})

app.get('/js/client.js', function (req, res) {
  res.sendFile('/js/client.js', {root: __dirname})
})

app.get('/style/style.css', function (req, res) {
  res.sendFile('/style/style.css', {root: __dirname})
})

app.get('/makebadge/small/:user/:repo', function (req, res) {
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
        svg = smallBadge.createSVG(result)
        res.set('Content-Type', 'image/svg+xml')
        res.set('Surrogate-Control', 'max-age=60')
        res.set('Cache-Control', 'private')
        res.send(svg)
      })
    })
})

app.get('/makebadge/medium/:user/:repo', function (req, res) {
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
        svg = mediumBadge.createSVG(result)
        res.set('Content-Type', 'image/svg+xml')
        res.set('Surrogate-Control', 'max-age=60')
        res.set('Cache-Control', 'private')
        res.send(svg)
      })
    })
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
        svg = largeBadge.createSVG(result)
        res.set('Content-Type', 'image/svg+xml')
        res.set('Surrogate-Control', 'max-age=60')
        res.set('Cache-Control', 'private')
        res.send(svg)
      })
    })
})

app.listen(process.argv[2], function () {
  console.log('running', process.argv[2])
})
