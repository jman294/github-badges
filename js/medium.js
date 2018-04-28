const fs = require('fs')
const path = require('path')
const dot = require('dot')

const medium = (function () {
  const githubTemplate = fs.readFileSync(path.join(__dirname, '..', 'templates', 'medium-badge.svg')).toString()

  const templateFunction = dot.template(githubTemplate)

  const timestampString = 'last commit '

  const usernameChar = 7.5
  const repoChar = 9.8
  const bottomStatsChar = 7.5

  const createSVG = function (data) {
    let userWidth = data.user.length * usernameChar
    let repoWidth = (data.repo.length+1) * repoChar
    let fullRepoWidth = userWidth+repoWidth
    let leftStart = 48

    let bottomString = timestampString + data.timestampRelative
    let bottomStringWidth = bottomString.length * bottomStatsChar

    let highwaterMark = fullRepoWidth + leftStart
    if (bottomStringWidth > highwaterMark) {
      highwaterMark = bottomStringWidth
    }

    data.width = highwaterMark + 8
    data.largerWidth = data.width + 2
    data.slashStart = userWidth + leftStart + 2
    data.repoStart = data.slashStart + repoChar + 2

    data.timestamp = bottomString

    let product = templateFunction(data)
    return product
  }

  return {
    createSVG
  }
})()

module.exports = medium
