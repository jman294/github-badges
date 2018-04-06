var badgeDivs = document.getElementsByClassName('badge')
var imgEls = document.getElementsByClassName('image')
var inputs = document.getElementsByClassName('input')
var markdowns = document.getElementsByClassName('markdown')
var timeout = 0

var LARGE = 0
var MEDIUM = 1
var SMALL = 2

var host = 'http://localhost:8000'
var apiList = ['/makebadge', '/makebadge/medium', '/makebadge/small']

function setImages () {
  var svgs = []
  getBadgeSvg(inputs[0].value, inputs[1].value, 0, function (type, user, repo) {
    if (this.status !== 200) {
      // Error
      setErrorVisible(true, this.responseText)
      return;
    } else {
      for (var i = 0; i < imgEls.length; i++) {
        markdowns[i].textContent = getMarkdown(i, user, repo)
        imgEls[i].src = host + apiList[i] + '/' + user + '/' + repo
      }
    }
  })
}

function getBadgeSvg (user, repo, type, callback) {
  var req = new XMLHttpRequest()
  req.addEventListener('load', function () {callback.call(this, type, user, repo)})
  req.open('GET', host + apiList[type] + '/' + user + '/' + repo)
  req.send()
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
  var pc = window.location.protocall
  var host = window.location.host
  return '[![GitHub Repository Badge]('+pc+host+apiList[type]+'/'+user+'/'+repo+')](https://github.com/'+user+'/'+repo
}

for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('input', function () {
    setErrorVisible(false)
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      if (inputs[0].value !== '' && inputs[1].value !== '') {
        setImages()
      }
    }, 1000)
  })
}
