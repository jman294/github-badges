const fs = require('fs')
const path = require('path')
const dot = require('dot')

const githubSVG = (function () {
  const githubTemplate = fs.readFileSync(path.join(__dirname, '..', 'templates', 'github-badge.svg')).toString()

  const templateFunction = dot.template(githubTemplate)

  function createSVG (data) {
    let product = templateFunction(data)
    return product
  }

  return {
    createSVG
  }
})()

module.exports = githubSVG
