firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("out").onclick = function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("Logged out");
          window.location.href = "/login/signin.html";
        })
        .catch((error) => {
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    };
    var uid = user.uid;

    // Fetching the collection name and data below
    // Display the user name to the profile name
    firebase
      .firestore()
      .collection("Doctors")
      .doc(uid)
      .get()
      .then((doc) => {
        var userName = doc.data().userName;
        document.getElementById("profileName").innerText = userName;
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      }); //collection code ends here
  }
  
});
