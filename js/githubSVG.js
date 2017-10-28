const fs = require('fs')
const path = require('path')
const dot = require('dot')

const githubSVG = (function () {
  const githubTemplate = fs.readFileSync(path.join(__dirname, '..', 'templates', 'github-badge.svg')).toString()

  const repoCharLimit = 17
  const statListingLimit = 20
  const languageName = 18

  const originalWidth = 300

  const templateFunction = dot.template(githubTemplate)
  const watcherString = ' watching'
  const starString = ' stars'
  const forkString = ' forks'
  const commitString = ' commits'
  const contributorString = ' contributors'

  function createSVG (data) {
    let repoLength = data.user.length + data.repo.length + 1
    let statStrings = []
    statStrings.push(data.watchers.concat(watcherString))
    statStrings.push(data.stars.concat(starString))
    statStrings.push(data.forks.concat(forkString))
    statStrings.push(data.commits.concat(commitString))
    statStrings.push(data.contributors.concat(contributorString))

    let pixelCountRecord = 0
    if (repoLength > repoCharLimit) {
      pixelCountRecord = (repoLength - repoCharLimit) * 10
    }

    for (let i = 0; i < statStrings.length; i++) {
      if (statStrings[i].length > statListingLimit) {
        if (((statStrings[i].length - statListingLimit) * 2) > pixelCountRecord) {
          pixelCountRecord = (statStrings[i].length - statListingLimit) * 3
        }
      }
    }

    data.watchers = statStrings[0]
    data.stars = statStrings[1]
    data.forks = statStrings[2]
    data.commits = statStrings[3]
    data.contributors = statStrings[4]

    data.width = originalWidth+pixelCountRecord
    data.adjWidth = data.width+5
    let product = templateFunction(data)
    return product
  }

  return {
    createSVG
  }
})()

module.exports = githubSVG
