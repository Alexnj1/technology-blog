// const { includes } = require("lodash");

const commentButton = document.querySelector("#post-comment");

function postComment() {
  const newComment = document.querySelector("#new-comment").value.trim();
  const postId = window.location.pathname.toString().slice(-1);

  if (newComment.length > 150) {
    const length = newComment.length;
    alert(`Comments may only be 150 characters (over by ${length - 150}).`);
    return;
  }
  fetch("/api/comment/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: newComment,
      post_id: postId,
    }),
  })
    .then((response) => {
      if (response.ok) {
        if(response.url.includes('/login')) {
          window.location.replace(response.url);
        } else {
          window.location.reload()
        }
      }
    })
    .catch((err) => {
      console.log(err);
      // alert("You must login again!"); // check back on this
      // window.location.replace("/home/login");
    });
}

commentButton.addEventListener("click", postComment);
