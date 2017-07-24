let button = document.getElementById('badge-button')
let userInput = document.getElementById('user-input')
let repoInput = document.getElementById('repo-input')
let error = document.getElementById('error')


button.addEventListener('click', function (e) {
  let user = userInput.value
  let repo = repoInput.value

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
        error.textContent = ''
        console.log(data)
      } else {
        // Error :(
        error.textContent = 'Invalid repository'
        image.innerHTML = ''
      }
    }
  }

  request.send();
  request = null;
})
