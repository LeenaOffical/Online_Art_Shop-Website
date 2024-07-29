
function toggleModal(id) {
  var modal = document.getElementById(id);
  modal.style.display = (modal.style.display === "block") ? "none" : "block";
}

// Close modals when clicking outside of them
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
      event.target.style.display = "none";
  }
}

// Store user data from the sign-up form in localStorage
function handleRegister(event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("pw").value;
  let userDetails = { fullName: name, email: email, password: password };
  
  if (!name || !email || !password) {
      alert("All fields are required.");
      return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(userDetails);
  localStorage.setItem("users", JSON.stringify(users));

  alert("User registered successfully.");
  toggleModal('id02');
}

// Check credentials from the login form
function check() {
  var username = document.getElementById('userName').value;
  var password = document.getElementById('userPw').value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(user => user.fullName === username && user.password === password);

  if (!user) {
      alert('ERROR: Incorrect username or password');
      return false;
  }

  alert('You are logged in.');
  window.location.replace("http://127.0.0.1:5500/index.html"); // Redirect to another page
  return false; // Prevent form submission
}