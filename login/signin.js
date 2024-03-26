document.getElementById("click").onclick = function () {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log(user);

      window.location.href = "../Dashboard.html";
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
};
