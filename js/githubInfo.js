const request = require('request')
const cheerio = require('cheerio')
const ago = require('timeago.js')()

const githubInfo = (function () {
  function getInfo (user, repo, callback) {
    let result = {}
    request(
        {url: `https://github.com/${user}/${repo}`,
          headers: {
            'User-Agent': 'jman294 github-badges'
          }
        },
        function (error, response, body) {
          if (error) {
            callback(error)
            return
          }
          if (response && response.statusCode >= 400) {
            callback(new Error())
            return
          }

          const undefinedString = 'unknown'

          let $ = cheerio.load(body)
            result.user = user
            result.repo = repo
            //result.contributors = $('svg.octicon-organization + span').text()
            //.replace(/\s/g, '') || undefinedString
            result.commits = $('svg.octicon-history + span').text()
            .replace(/\s/g, '') || undefinedString
            result.defaultBranch = $('button i + span.js-select-button').text()
            result.watchers = $('a[aria-label*="watching"]').text()
            .replace(/\s/g, '') || undefinedString
            result.stars = $('a[aria-label*="starred"]').text()
            .replace(/\s/g, '') || undefinedString
            result.forks = $('a[aria-label*="forked"]').text()
            .replace(/\s/g, '') || undefinedString
            result.forks = $('a[aria-label*="forked"]').text()
            .replace(/\s/g, '') || undefinedString
            result.issues = $('.octicon-issue-opened').parent().children().eq(2).text() || undefinedString

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
          request(
              {url: `https://api.github.com/repos/${user}/${repo}/commits/master`,
                headers: {
                  'User-Agent': 'jman294 github-badges'
                }
              },
              function (error, response, body) {
                if (error) {
                  callback(error)
                  return
                }
                let lastCommit = JSON.parse(body)
                if (lastCommit.commit !== undefined) {
                  lastCommit = lastCommit.commit.author.date
                  result.timestamp = lastCommit
                  result.timestampRelative = ago.format(lastCommit)
                } else {
                  result.timestamp = 0
                  result.timestampRelative = 'never'
                }
                callback(undefined, result)
              })
        })
  }

  return {
    getInfo
  }
})()

module.exports = githubInfo
