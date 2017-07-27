let button = document.getElementById('badge-button')
let userInput = document.getElementById('user-input')
let repoInput = document.getElementById('repo-input')
let error = document.getElementById('error')
let markdown = document.getElementById('markdown')

button.addEventListener('click', function (e) {
  let user = userInput.value
  let repo = repoInput.value
  let markdownTemplate = 'Markdown: [![github repository]('+location.protocol+'//'+window.location.host+'/makebadge/$USER/$REPO)](https://github.com/$USER/$REPO)'

  if (user === '' || repo === '') {
    return
  }

  let request = new XMLHttpRequest();
  request.open('GET', `/makebadge/${user}/${repo}`, true);

  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        let data = this.responseText
        image.innerHTML = data
        error.style.display = 'none'
        markdown.textContent = markdownTemplate
                               .replace(/\$USER/g, user)
                               .replace(/\$REPO/g, repo)
      } else {
        error.style.display = 'inline-block'
        error.textContent = this.responseText
        image.innerHTML = ''
      }
    }
  }

  request.send();
  request = null;
})
