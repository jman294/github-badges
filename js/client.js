var badgeDivs = document.getElementsByClassName('badge')
var imgEls = document.getElementsByClassName('image')
var inputs = document.getElementsByClassName('input')
var markdowns = document.getElementsByClassName('markdown')
var header = document.getElementsByTagName('head')[0]
var timeout = 0

var LARGE = 0
var MEDIUM = 1
var SMALL = 2

var host = window.location.protocol + '//' + window.location.host
var apiList = ['/makebadge', '/makebadge/medium', '/makebadge/small']

function setImages () {
  setWidth(10)
  var svgs = []
  getBadgeSvg(inputs[0].value, inputs[1].value, 0, function (type, user, repo) {
    if (this.status !== 200) {
      setErrorVisible(true, this.responseText)
      return;
    } else {
      for (var i = 0; i < imgEls.length; i++) {
        markdowns[i].textContent = getMarkdown(i, user, repo)
        imgEls[i].src = host + apiList[i] + '/' + user + '/' + repo
      }
    }
  }, function (e) {
    if (e.lengthComputable) {
      setWidth((e.loaded / e.total) * 100)
      console.log(e)
    }
  })
}

function getBadgeSvg (user, repo, type, callback, progress) {
  var req = new XMLHttpRequest()
  req.addEventListener('load', function () {callback.call(this, type, user, repo)})
  req.addEventListener('progress', progress)
  req.open('GET', host + apiList[type] + '/' + user + '/' + repo)
  req.send()
}

function setWidth (percent) {
  document.styleSheets[0].cssRules[1].style.width = percent + '%'
}

function setErrorVisible (visible, text) {
  var error = document.getElementById('error')
  return (function () {
    if (visible) {
      error.style.display = 'block'
    } else {
      error.style.display = 'none'
    }
    error.textContent = text
  })()
}

function getMarkdown (type, user, repo) {
  var pc = window.location.protocol
  var host = window.location.host
  return '[![GitHub Repository Badge](' + pc + '//' + host + apiList[type] + '/' + user + '/' + repo + ')](https://github.com/' + user + '/' + repo+ ')'
}

for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('input', function () {
    setWidth(0)
    setErrorVisible(false)
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      if (inputs[0].value !== '' && inputs[1].value !== '') {
        setImages()
      }
    }, 1000)
  })
}

inputs[1].addEventListener('keyup', function (e) {
  if (e.which === 13 && inputs[0].value !== '' && inputs[1].value !== '') {
    clearTimeout(timeout)
    setImages()
  }
})
