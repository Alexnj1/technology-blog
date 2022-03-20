const postBtn = document.querySelector("#submit-edit-btn");

function editPost(event) {
  event.preventDefault();

  const postTitle = document.querySelector("#edit-title").value.toString();
  const postBody = document.querySelector("#edit-post-body").value.toString();
  const postId = window.location.pathname.toString().slice(-1);

  if (postTitle && postBody) {
    if (postTitle.length > 255) {
      alert(
        `Post title cannot be more than 255 characters, over by ${
          postTitle.length - 255
        }`
      );
    } else if (postBody.length > 255) {
      alert(
        `Post body cannot be more than 255 characters, over by ${
          postBody.length - 255
        }`
      );
    } else {
      fetch(`/api/post/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: postTitle,
          content: postBody,
        }),
      })
        .then((response) => {
          if (response.ok) {
            window.location.replace("/dashboard");
          } else {
            console.log(response);
            alert("There has been an error");
              window.location.replace("/home");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } else {
    alert("You must fill in both fields!");
  }
}

postBtn.addEventListener("click", editPost);
