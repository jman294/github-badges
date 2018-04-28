const githubInfo = require('../js/githubInfo')
const assert = require('assert')

describe('githubInfo', function () {
  describe('getInfo', function () {
    it('should return object with correct stats for valid repo', function (done) {
      githubInfo.getInfo('jman294', 'github-badges', function (err, result) {
        assert(err === undefined);
        assert.equal(result.user, 'jman294')
        assert.equal(result.repo, 'github-badges')
        assert.notEqual(result.contributors, undefined)
        assert.notEqual(result.commits, undefined)
        assert.notEqual(result.defaultBranch, undefined)
        assert.notEqual(result.watchers, undefined)
        assert.notEqual(result.stars, undefined)
        assert.notEqual(result.forks, undefined)
        assert.notEqual(result.issues, undefined)
        assert.notEqual(result.language, undefined)
        assert.notEqual(result.languageColor, undefined)
        assert.notEqual(result.timestamp, undefined)
        assert.notEqual(result.timestampRelative, undefined)
        done()
      })
    })
    it('should return error for invalid repository', function (done) {
      githubInfo.getInfo('jman294', 'doesnotexist', function (err, result) {
        assert.notEqual(err, undefined)
        done()
      })
    })
  })
})
