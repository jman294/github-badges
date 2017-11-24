const request = require('request')
const cheerio = require('cheerio')

const githubInfo = (function () {
  function getInfo (user, repo, callback) {
    const  headers = {
      'User-Agent': 'jman294'
    }
    let result = {}
    request(
        `https://github.com/${user}/${repo}`,
        function (error, response, body) {
      if (error) {
        callback(error)
        return
      }

      let $ = cheerio.load(body)

      result.user = user
      result.repo = repo
      result.contributors = $('svg.octicon-organization + span').text()
                            .replace(/\s/g, '')
      result.commits = $('svg.octicon-history + span').text()
                            .replace(/\s/g, '')
      result.defaultBranch = $('button i + span.js-select-button').text()
      result.watchers = $('a[aria-label*="watching"]').text()
                            .replace(/\s/g, '')
      result.stars = $('a[aria-label*="starred"]').text()
                            .replace(/\s/g, '')
      result.forks = $('a[aria-label*="forked"]').text()
                            .replace(/\s/g, '')

      let tmpColorGraph = $('.repository-lang-stats-graph').children('span')[0]
      if (tmpColorGraph !== undefined) {
        result.language = tmpColorGraph.children[0].data
        tmpLanguageStyle = tmpColorGraph.attribs.style
        result.languageColor =
              tmpLanguageStyle.slice(tmpLanguageStyle.indexOf('#'), -1)
      } else {
        result.language = 'Unspecified'
        result.languageColor = '#000000'
      }

      callback(undefined, result)
    })
  }

  return {
    getInfo
  }
})()

module.exports = githubInfo
