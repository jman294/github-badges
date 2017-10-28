const githubSVG = require('../js/githubSVG')
const githubInfo = require('../js/githubInfo')
const assert = require('assert')

describe('githubSVG', function () {
  describe('#createSVG', function () {
    it('should replace widen badge for longer repos', function () {
      assert.ok(githubSVG.createSVG(
        {repo: 'asdfasdfasdfasdf',
          user:'a',
          stars: '2',
          forks: '3',
          contributors: '5',
          watchers: '0',
          commits: '45'
        }).indexOf('310') !== -1)
    })
    it('should replace widen badge for bigger stats', function () {
      assert.ok(githubSVG.createSVG(
        {repo: 'farts',
          user:'a',
          stars: '2',
          forks: '3',
          contributors: '5',
          watchers: '5',
          commits: '45'
        }).indexOf('300') !== -1)
      assert.ok(githubSVG.createSVG(
        {repo: 'farts',
          user:'a',
          stars: '2',
          forks: '3',
          contributors: '555,555,555,555',
          watchers: '0',
          commits: '45'
        }).indexOf('324') !== -1)
      assert.ok(githubSVG.createSVG(
        {repo: 'farts',
          user:'a',
          stars: '2',
          forks: '3',
          contributors: '5',
          watchers: '555555555555',
          commits: '45'
        }).indexOf('303') !== -1)
    })
  })
})
describe('githubInfo', function () {
  describe('#getInfo', function () {
    it('should return information for a github repo', function (done) {
      githubInfo.getInfo('samdup123', 'Collatz', function (err, body) {
        assert.ok(body !== undefined)
        done()
      })
    })
    it('should throw an error for invalid repo', function (done) {
      githubInfo.getInfo('jjjjjj', 'jjjjjjj', function (err, body) {
        assert.ok(err !== undefined)
        done()
      })
    })
  })
})
