const deleteButton = document.querySelector("#delete-post-btn");

function deletePost() {
  const postId = window.location.pathname.toString().slice(-1);
  fetch(`/api/post/${postId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        window.location.replace("/dashboard");
      }
    })
    .catch((err) => {
      console.log(err);
      alert("There was an error");
      window.location.replace("/home");
    });
}

deleteButton.addEventListener('click', deletePost)