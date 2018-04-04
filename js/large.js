const fs = require('fs')
const path = require('path')
const dot = require('dot')

const large = (function () {
  const githubTemplate = fs.readFileSync(path.join(__dirname, '..', 'templates', 'large-badge.svg')).toString()

  const templateFunction = dot.template(githubTemplate)

  const starString = '★'
  const commitString = ' commits'
  const contributorString = ' contributors'
  const issueString = ' issues'
  const timestampString = 'last commit '

  const usernameChar = 6.5
  const repoChar = 7
  const bottomStatsChar = 5.5

  const makeParcel = function (strings, width) {
    let parcel = {}
    parcel.widths = []
    let recordHigh = 0
    for (let i in strings) {
      let tmpWidth = strings[i].length * width
      if (tmpWidth > recordHigh) {
        recordHigh = tmpWidth
      }
      parcel.widths.push(tmpWidth)
    }
    parcel.width = recordHigh
    return parcel
  }

  const createSVG = function (data) {
    let userWidth = data.user.length * usernameChar
    let repoWidth = (data.repo.length+1) * repoChar
    let fullRepoWidth = userWidth+repoWidth
    let leftStart = 48

    let leftStrings =
        [timestampString + data.timestampRelative,
         data.contributors + contributorString]
    let leftParcel = makeParcel(leftStrings, bottomStatsChar)
    let rightStart = leftParcel.width + leftStart + 20

    let rightStrings =
        [data.commits + commitString,
         data.issues + issueString]
    let rightParcel = makeParcel(rightStrings, bottomStatsChar)

    let highwaterMark = fullRepoWidth
    let bottomWidths = rightParcel.widths.map((e) => e+rightStart)
    for (let width in bottomWidths) {
      if (bottomWidths[width] > highwaterMark) {
        highwaterMark = bottomWidths[width]
      }
    }

    data.width = highwaterMark + 8
    data.largerWidth = data.width + 2
    data.rightStart = rightStart
    data.slashStart = userWidth + leftStart + 2
    data.repoStart = data.slashStart + repoChar + 2

    data.timestamp = leftStrings[0]
    data.contributors = leftStrings[1]
    data.commits = rightStrings[0]
    data.issues = rightStrings[1]

    let product = templateFunction(data)
    return product
  }

  return {
    createSVG
  }
})()

module.exports = large
