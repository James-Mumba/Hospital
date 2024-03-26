// var chat = document.getElementById("chat");
// var chat2 = document.getElementById("chat2");
// var chat3 = document.getElementById("chat3");
// var chat4 = document.getElementById("chat4");
// var chat5 = document.getElementById("chat5");

var cloze = document.getElementById("cloze"); 
var messanger = document.getElementById("messanger");

// chat.onclick = function () {
//   messanger.classList.remove("hidden");
// };
// chat2.onclick = function () {
//   messanger.classList.remove("hidden");
// };
// chat3.onclick = function () {
//   messanger.classList.remove("hidden");
// };
// chat4.onclick = function () {
//   messanger.classList.remove("hidden");
// };
// chat5.onclick = function () {
//   messanger.classList.remove("hidden");
// };

cloze.onclick = function () {
  messanger.classList.add("hidden");
};

// Code to open and close the PopUp

// Get the data-container element
const dataContainer = document.getElementById("data-container");

// Function to toggle the display of data-container
function toggleDataContainer() {
  if (
    dataContainer.style.display === "none" ||
    dataContainer.style.display === ""
  ) {
    dataContainer.style.display = "flex"; // or "block" depending on your needs
  } else {
    dataContainer.style.display = "none";
  }
}

// Example: Add event listener to a button
const toggleButton = document.getElementById("toggle-button"); // Assuming you have a button with id "toggle-button"

toggleButton.addEventListener("click", toggleDataContainer);

// function to clear and close the above

function clearAndCloseDataContainer() {
  const inputs = dataContainer.querySelectorAll("input, select ");
  inputs.forEach((input) => {
    if (
      input.type === "text" ||
      input.type === "email" ||
      input.type === "tel" ||
      input.tagName === "SELECT"
    ) {
      input.value = "";
    }
  });
  dataContainer.style.display = "none";
}

const exitButton = document.querySelector(".exit");
exitButton.addEventListener("click", clearAndCloseDataContainer);

// Creating new patient details collection
document.getElementById("submit").onclick = function () {
  let patient = document.getElementById("patientName").value;
  let age = document.getElementById("age").value;
  let gender = document.getElementById("gender").value;
  let blood = document.getElementById("bloodGroup").value;
  let contact = document.getElementById("contact").value;
  let mail = document.getElementById("patientMail").value;

  let timestamp = new Date();

  let submit = firebase.firestore().collection("Patient-Data").doc();
  submit
    .set({
      patients: patient,
      submitId: submit.id,
      age: age,
      sex: gender,
      bloodType: blood,
      contact: contact,
      mail: mail,
      time: timestamp,
    })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}; //code works like a charm

//fetching the code from firestore and appending it to the names div (table)

// Reference to the Firestore collection
const patientDataCollection = firebase.firestore().collection("Patient-Data");

// Reference to the names table
const namesTable = document.getElementById("names").querySelector("table");

// Function to fetch and append data to the table
function fetchDataAndAppendToTable() {
  // Clear existing table rows
  namesTable.innerHTML = `
        <tr>
            <th>Patient Name</th>
            <th class="blink age">Age</th>
            <th class="blink gender">Gender</th>
            <th class="blink blood">Blood Group</th>
            <th class="blink tel">Phone Number</th>
            <th class="blink mail">Email</th>
            <th>User Action</th>
        </tr>
    `;

  // Fetch data from Firestore
  patientDataCollection
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // Create a new table row
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
                <td>${data.patients}</td>
                <td class="blink age">${data.age}</td>
                <td class="blink gender">${data.sex}</td>
                <td class="blink blood">${data.bloodType}</td>
                <td class="blink tel">${data.contact}</td>
                <td class="blink mail">${data.mail}</td>
                <td class="btn">
                    <button class="blue" id="chat${doc.id}">M</button>
                    <button class="message red">x</button>
                    <button class="message line">i</button>
                </td>
            `;

        // Append the new row to the table
        namesTable.appendChild(newRow);

        // Add click event listener to the chat button
        const chatButton = newRow.querySelector(`#chat${doc.id}`);
        chatButton.addEventListener("click", () => {
          messanger.classList.remove("hidden");
        });
      });
    })
    .catch((error) => {
      console.log("Error fetching data: ", error);
    });
}

// Call the function to fetch and append data when the page loads
fetchDataAndAppendToTable();

//code for searching for a patient using the search input

const searchInput = document.querySelector(".search input");

//filter and display table rows based on search input
function filterTableRows() {
  const searchTerm = searchInput.value.toLowerCase();
  const tableRows = namesTable.querySelectorAll("tr");

  tableRows.forEach((row) => {
    const patientName = row.querySelector("td:first-child");
    if (patientName) {
      const patientNameText = patientName.textContent.toLowerCase();
      if (patientNameText.includes(searchTerm)) {
        row.style.display = ""; 
      } else {
        row.style.display = "none";
      }
    }
  });
}

// Add event listener to search input
searchInput.addEventListener("input", filterTableRows);
