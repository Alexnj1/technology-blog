const logInButton = document.querySelector("#log-in");

const signUpButton = document.querySelector("#sign-up");

// log in fetch request function taking in parameters from the sign up function to automatically log in a new user
function logIn(event, newEmail, newPassword) {
  event.preventDefault();

  const email = document.querySelector("#email-form").value.trim();
  const password = document.querySelector("#password-form").value.trim();

  if ((email || newEmail) && (password || newPassword)) {
    fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email || newEmail,
        password: password || newPassword,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json();
          alert("You are now logged in!");
          window.location.replace("/");
        } else {
          alert("Your email/password is incorrect");
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    alert("You must fill out both fields!");
  }

  console.log(password);
}

function signUp(event) {
  const newUser = document.querySelector("#new-user").value.trim();
  const newEmail = document.querySelector("#new-email").value.trim();
  const newPassword = document.querySelector("#new-password").value.trim();

  if (newUser && newEmail && newPassword) {
    if (newPassword.toString().length < 8) {
      alert("Password must be at least 8 characters!");
      return;
    }
    fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: newUser,
        email: newEmail,
        password: newPassword,
      }),
    }).then((response) => {
      if (response.ok) {
        alert("New user created!");
        logIn(event, newEmail, newPassword);
        // window.location.reload()
      } else {
        alert(response.statusText);
      }
    });
  } else {
    alert("You must fill out all required fields!");
  }
}

logInButton.addEventListener("click", logIn);
signUpButton.addEventListener("click", signUp);
