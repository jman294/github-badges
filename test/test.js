const githubSVG = require('../js/githubSVG')
const githubInfo = require('../js/githubInfo')
const assert = require('assert')

describe('githubSVG', function () {
  describe('#createSVG', function () {
    it('should replace commits with correct number', function () {
      const correctSVG = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="200"> <rect width="300" height="200" fill="#FFFFFF" stroke="#000000" stroke-width="6px"/> <text x="5" y="19"> Commits: 13 </text></svg>'
      assert.equal(githubSVG.createSVG(13), correctSVG)
    })
  })
})
describe('githubInfo', function () {
  describe('#getInfo', function () {
    it('should return information for a github repo', function (done) {
      githubInfo.getInfo('jman294', 'talkback', function (err, body) {
        console.log(body)
        done()
      })
    })
  })
})
