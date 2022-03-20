const postBtn = document.querySelector('#submit-post-btn')

function addPost (event) {
    event.preventDefault()

    const postTitle = document.querySelector('#new-title').value.toString()
    const postBody = document.querySelector('#new-post-body').value.toString()

    if (postTitle && postBody) {
        fetch('/api/post/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: postTitle,
                content: postBody
            })
        }).then(response => {
            if (response.ok) {
                window.location.replace('/dashboard')
            }
        }).catch(err => {
            console.log(err)
            alert('There has been an error')
            window.location.replace('/home')
        })
    } else {
        alert('You must fill in both fields!')
    }
}

postBtn.addEventListener('click', addPost)