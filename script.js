import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAjAQlKwyOBElU6HbwvU325lnZOdQ77-YU",
  authDomain: "cidiacheats-23f52.firebaseapp.com",
  projectId: "cidiacheats-23f52",
  storageBucket: "cidiacheats-23f52.appspot.com",
  messagingSenderId: "787569083727",
  appId: "1:787569083727:web:970c096c88d5444a6df13a",
  measurementId: "G-DZHB893J00"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct");

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");

const returnBtn = document.getElementById("return-btn");

// Function to show notifications
function showNotification(message, isError = false) {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  if (isError) {
    notification.classList.add("error");
  }
  notification.innerText = message;
  document.body.appendChild(notification);

  // Position notification in the top-right corner
  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.right = "20px";

  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// Event listener for create account button
createacctbtn.addEventListener("click", function() {
  // Clear any existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach(notification => notification.remove());

  // Flag to verify form inputs
  let isVerified = true;

  // Get form input values
  const signupEmail = signupEmailIn.value;
  const confirmSignupEmail = confirmSignupEmailIn.value;
  const signupPassword = signupPasswordIn.value;
  const confirmSignUpPassword = confirmSignUpPasswordIn.value;

  // Check if email fields match
  if (signupEmail !== confirmSignupEmail) {
    showNotification("Email fields do not match. Please try again.", true);
    isVerified = false;
  }

  // Check if password fields match
  if (signupPassword !== confirmSignUpPassword) {
    showNotification("Password fields do not match. Please try again.", true);
    isVerified = false;
  }
  
  // Check if any required field is empty

  
  // If form inputs are verified, attempt to create user account
  if (isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
        // Account creation successful
        const user = userCredential.user;
        showNotification("Success! Account created.");
      })
      .catch((error) => {
        // Account creation failed
        const errorCode = error.code;
        let errorMessage = "Error occurred. Please try again.";
        if (errorCode === "auth/email-already-in-use") {
          errorMessage = "Email is already in use. Please use a different email address.";
        } else if (errorCode === "auth/weak-password") {
          errorMessage = "Password is too weak. Please choose a stronger password.";
        } else if (errorCode === "auth/invalid-email") {
          errorMessage = "Invalid email address. Please enter a valid email address.";
        }
        showNotification(errorMessage, true);
      });
  }
});


submitButton.addEventListener("click", function() {
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Success! Welcome back!");
      showNotification("Success! Welcome back!");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error occurred. Try again.");
      showNotification("Error occurred. Try again.", true);
    });
});

signupButton.addEventListener("click", function() {
  main.style.display = "none";
  createacct.style.display = "block";
});

returnBtn.addEventListener("click", function() {
  main.style.display = "block";
  createacct.style.display = "none";
});
