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

// function to clear and close the above popup

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
//end of popup code

// firebase collection creation

// Creating new patient details collection
//accessed using the new patient button
document.getElementById("submit").onclick = function () {
  let patient = document.getElementById("patientName").value;
  let age = document.getElementById("age").value;
  let gender = document.getElementById("gender").value;
  let blood = document.getElementById("bloodGroup").value;
  let contact = document.getElementById("contact").value;
  let Doc_Assigned = document.getElementById("patientMail").value;

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
      docAssigned: Doc_Assigned,
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
            <th class="blink mail">Doc Assigned</th>
            <th>User Action</th>
        </tr>
    `;

  // New Patient Table side

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
                <td class="blink docAssigned">${data.docAssigned}</td>
                <td class="btn">
                    <button class="message blue" id="chat${doc.id}"><i class="fa-solid fa-syringe"></i></button>
                    <button class="message line">i</button>
                    <button class="message red" id="delete${doc.id}"><i class="fa-solid fa-trash-can"></i></button>
                </td>
            `;

        // Append the new row to the table
        namesTable.appendChild(newRow);

        // Add click event listener to the chat button
        const chatButton = newRow.querySelector(`#chat${doc.id}`);
        chatButton.addEventListener("click", () => {
          messanger.classList.remove("hidden");
        });
        const deleteButton = newRow.querySelector("#delete" + doc.id);
        deleteButton.addEventListener("click", () => {
          deletePatientData(doc.id);
        });
      });
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
  //delete function
  function deletePatientData(docId) {
    patientDataCollection
      .doc(docId)
      .delete()
      .then(() => {
        console.log("deleted successfully");
        //refresh the table after deleting doc
        fetchDataAndAppendToTable();
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log("error removing document:", errorMessage);
      });
  }
}

// Call the function to fetch and append data when the page loads here
fetchDataAndAppendToTable();
//
//delete function

//search input below
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

//previous and next buttons
// creating a next and previous page
// const entriesPerPage = 7;
// let currentPage = 1;

// const sampleData = [
//   {
//     age: "12",
//     bloodType: "",
//     contact: "6789",
//     docAssigned: "ajhsa@ajsna.kasjnc",
//     patients: "john",
//     sex: "",
//   },
//   {
//     age: "121",
//     bloodType: "",
//     contact: "16789",
//     docAssigned: "qajhsa@ajsna.kasjnc",
//     patients: "john t",
//     sex: "",
//   },
//   {
//     age: "1",
//     bloodType: "",
//     contact: "789",
//     docAssigned: "jhsa@ajsna.kasjnc",
//     patients: "jon",
//     sex: "",
//   },
//   {
//     age: "2",
//     bloodType: "",
//     contact: "89",
//     docAssigned: "a@ajsna.kasjnc",
//     patients: "jo",
//     sex: "",
//   },
//   {
//     age: "41",
//     bloodType: "",
//     contact: "9",
//     docAssigned: "aa@ajsna.kasjnc",
//     patients: "peet",
//     sex: "",
//   },
//   {
//     age: "44",
//     bloodType: "",
//     contact: "0298320",
//     docAssigned: "kls@fwsdvm.kasjnc",
//     patients: "pgv",
//     sex: "",
//   },
//   {
//     age: "122",
//     bloodType: "",
//     contact: "672-349",
//     docAssigned: "sdvsva@ssajsna.kasjnc",
//     patients: "johnny",
//     sex: "",
//   },
// ];

// const totalPages = Math.ceil(sampleData.length / entriesPerPage);

// function displayEntries() {
//   const startIndex = (currentPage - 1) * entriesPerPage;
//   const endIndex = startIndex + entriesPerPage;
//   const currentEntries = sampleData.slice(startIndex, endIndex);

//   console.log("Current Page", currentPage);
//   console.log(currentEntries);

//   document.getElementById("prev").disabled = currentPage === 1;
//   document.getElementById("next").disabled = currentPage === totalPages;
// }
// // call the function
// displayEntries();

// //event listener for the previous and next buttons

// document.getElementById("prev").addEventListener("click", () => {
//   if (currentPage > 1) {
//     currentPage--;
//     displayEntries();
//   }
// });

// document.getElementById("next").addEventListener("click", () => {
//   if (currentPage < totalPages) {
//     currentPage++;
//     displayEntries();
//   }
// });
