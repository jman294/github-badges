const request = require('request')
const cheerio = require('cheerio')

const githubInfo = (function () {
  function getInfo (user, repo, callback) {
    const  headers = {
      'User-Agent': 'jman294'
    }
    let result = {}

    request(
    {
      url: `https://api.github.com/repos/${user}/${repo}/contributors`,
      headers: headers
    },
    function (error, response, body) {
      if (error) {
        callback(error)
        return
      }
      result.contributors = JSON.parse(body).length
      request(`https://github.com/${user}/${repo}`, function (error, response, body) {
        if (error) {
          callback(error)
          return
        }
        let $ = cheerio.load(body)
        result.commits = parseInt($('svg.octicon-history + span').text())
        result.defaultBranch = $('button i + span.js-select-button').text()
        result.watchers = parseInt($('a[aria-label*="watching"]').text())
        result.stars = parseInt($('a[aria-label*="starred"]').text())
        result.forks = parseInt($('a[aria-label*="forked"]').text())
        callback(undefined, result)
      })
    })
  }

  return {
    getInfo
  }
})()

module.exports = githubInfo
