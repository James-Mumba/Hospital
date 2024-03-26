document.getElementById("click").onclick = function () {
  var name = document.getElementById("Name").value;
  var email = document.getElementById("Email").value;
  var password = document.getElementById("Password").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      let uid = userCredentials.user.uid;
      var user = userCredentials.user;

      console.log(user);

      // creating a firestore collection for the Doctors
      firebase
        .firestore()
        .collection("Doctors")
        .doc(uid)
        .set({
          userId: uid,
          userName: name,
          userEmail: email,
        })
        .then(() => {
          window.location.href = "../Dashboard.html";
        })
        .catch((error) => {
          var errorMessage = error.message;
          console.log(errorMessage);
        }); //collection code ends here
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
};
