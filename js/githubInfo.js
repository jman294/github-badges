const request = require('request')
const cheerio = require('cheerio')

const githubInfo = (function () {
  function getInfo (user, repo, callback) {
    const  headers = {
      'User-Agent': 'jman294'
    }
    let result = {}
    result.user = user
    result.repo = repo

    request(
    {
      url: `https://api.github.com/repos/${user}/${repo}/contributors`,
      headers: headers
    },
    function (error, response, body) {
      if (response.statusCode === 404) {
        callback(new Error('Invalid repository'))
      }
      if (error) {
        callback(error)
        return
      }
      try {
        result.contributors = JSON.parse(body).length
      } catch (e) {
        callback(new Error('Empty repository'))
        return
      }
      request(`https://github.com/${user}/${repo}`, function (error, response, body) {
        if (error) {
          callback(error)
          return
        }
        let $ = cheerio.load(body)
        result.commits = $('svg.octicon-history + span').text().replace(/\s/g, '')
        result.defaultBranch = $('button i + span.js-select-button').text()
        result.watchers = $('a[aria-label*="watching"]').text().replace(/\s/g, '')
        result.stars = $('a[aria-label*="starred"]').text().replace(/\s/g, '')
        result.forks = $('a[aria-label*="forked"]').text().replace(/\s/g, '')
        result.language = $('.repository-lang-stats-graph').children('span')[0].children[0].data
        tmpLanguageStyle = $('.repository-lang-stats-graph').children('span')[0].attribs.style
        result.languageColor = tmpLanguageStyle.slice(tmpLanguageStyle.indexOf('#'), -1)
        callback(undefined, result)
      })
    })
  }

  return {
    getInfo
  }
})()

module.exports = githubInfo
