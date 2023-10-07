// Get all the navbar links
const navLinks = document.querySelectorAll(".nav-link");

// Function to remove "bold" class from all links
function removeBoldClassFromLinks() {
  navLinks.forEach((link) => {
    link.classList.remove("bold");
  });
}

// Add click event listeners to the links
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    removeBoldClassFromLinks();
    link.classList.add("bold");
  });
});


//Firebase:
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getDatabase,ref,set,push } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

  var firebaseConfig = {
    apiKey: "AIzaSyAQBWLjREIjChhdHNa-GNBdAENlBWwtXcE",
    authDomain: "usaventscare-ea8d7.firebaseapp.com",
    databaseURL: "https://usaventscare-ea8d7-default-rtdb.firebaseio.com",
    projectId: "usaventscare-ea8d7",
    storageBucket: "usaventscare-ea8d7.appspot.com",
    messagingSenderId: "607867502635",
    appId: "1:607867502635:web:7d4273503ff90925516a6e",
    measurementId: "G-J5KMX85285"
  };

  // Initialize Firebase
  var app = initializeApp(firebaseConfig);
  var database = getDatabase(app);

  var name = document.getElementById('username');
  var lastname = document.getElementById('lastname');
  var email = document.getElementById('useremail');
  var contact = document.getElementById("usercontact");
  var city = document.getElementById('usercity');
  var state = document.getElementById('userstate');
  var zipcode = document.getElementById('userzipcode');
  var address = document.getElementById('useraddress');
  var service = document.getElementById('option');
  var otherservice = document.getElementById('otherservice');
  var checkboxes = document.querySelectorAll('input[type=checkbox]');



  window.sentdataToDatabase = function() {
    var selectedServices = [];
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    checkboxes.forEach(function(checkbox) {
        selectedServices.push(checkbox.name);
    });

    var customerData = {
        name: name.value,
        lastname: lastname.value,
        email: email.value,
        contact: contact.value,
        city: city.value,
        state: state.value,
        zipcode: zipcode.value,
        address: address.value,
        services: selectedServices,
        otherservice: otherservice.value
    };
    var date = new Date();
    console.log(date);

    var reference = ref(database, `customers/${date}`);
    var newCustomerRef = push(reference);
    var randomid = newCustomerRef.key;
    customerData.id = randomid;

    set(newCustomerRef, customerData);
};

var submitButton = document.getElementById('submitButton');

// Adding event listener to the submit button
submitButton.addEventListener('click', function(event) {
    event.preventDefault();

    // Form validation
    if (name.value === '' || lastname.value === '' || email.value === '' || contact.value === '' || city.value === '' || state.value === '' || zipcode.value === '' || address.value === '') {
        alert('Please fill out all fields');
        return; // Stop further execution
    }

    // Rest of your code for sending data to the database
    alert("your form has submitted successfully");
    sentdataToDatabase();

    // Clear form fields
    name.value = '';
    lastname.value = '';
    email.value = '';
    contact.value = '';
    city.value = '';
    state.value = '';
    zipcode.value = '';
    address.value = '';
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
    otherservice.value = '';
});
