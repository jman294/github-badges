let button = document.getElementById('badge-button')
let userInput = document.getElementById('user-input')
let repoInput = document.getElementById('repo-input')
let error = document.getElementById('error')
let markdown = document.getElementById('markdown')
let markdownLabel = document.getElementById('markdown-label')

button.addEventListener('click', function(e) {
  let user = userInput.value
  let repo = repoInput.value
  let markdownTemplate = '[![github repository](' + location.protocol + '//' + window.location.host + '/makebadge/$USER/$REPO)](https://github.com/$USER/$REPO)'

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
        markdownLabel.style.display = 'inline-block'
        markdown.style.display = 'inline-block'
        markdown.textContent = markdownTemplate
          .replace(/\$USER/g, user)
          .replace(/\$REPO/g, repo)
      } else {
        error.style.display = 'inline-block'
        markdownLabel.style.display = 'none'
        error.textContent = this.responseText
        image.innerHTML = ''
        markdown.textContent = ''
        markdown.style.display = 'none'
      }
    }
  }

  request.send();
  request = null;
})

markdown.addEventListener('click', function(e) {
  selectText(markdown)
})

function selectText(node) {

  if (document.selection) {
    let range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
  } else if (window.getSelection) {
    let range = document.createRange();
    range.selectNodeContents(node);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }
}
