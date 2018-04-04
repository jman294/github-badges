const fs = require('fs')
const path = require('path')
const dot = require('dot')

const small = (function () {
  const githubTemplate = fs.readFileSync(path.join(__dirname, '..', 'templates', 'small-badge.svg')).toString()

  const templateFunction = dot.template(githubTemplate)

  const timestampString = 'last commit '

  const usernameChar = 6.5
  const repoChar = 8

  const createSVG = function (data) {
    let userWidth = data.user.length * usernameChar
    let repoWidth = (data.repo.length+1) * repoChar
    let fullRepoWidth = userWidth+repoWidth
    let leftStart = 22

    data.width = fullRepoWidth + leftStart + 8
    data.largerWidth = data.width + 2
    data.slashStart = userWidth + leftStart + 2
    data.repoStart = data.slashStart + repoChar + 2

    let product = templateFunction(data)
    return product
  }

  return {
    createSVG
  }
})()

module.exports = small
