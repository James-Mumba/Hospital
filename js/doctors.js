// show or hide
document.addEventListener("DOMContentLoaded", function () {
  // Function to toggle visibility of shown and patients-card-rec divs
  function toggleDivs() {
    var shownDiv = document.getElementById("show");
    var cardRecDiv = document.getElementById("cardRecord");

    if (shownDiv.style.display === "none") {
      shownDiv.style.display = "flex";
      cardRecDiv.style.display = "none";
    } else {
      shownDiv.style.display = "none";
      cardRecDiv.style.display = "flex";
    }
  }

  // Event listener for patientButton
  var patientButton = document.getElementById("patientButton");
  patientButton.addEventListener("click", function () {
    toggleDivs();
  });

  // Event listener for exit button
  var exitButton = document.getElementById("exit");
  exitButton.addEventListener("click", function () {
    toggleDivs();
  });
});
