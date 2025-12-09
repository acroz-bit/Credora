// Store user accounts
let users = [];

const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageDiv = document.getElementById('message');

// Check if there are any links that should trigger signup
const signupLinks = document.querySelectorAll('a[href="#"]');
signupLinks.forEach(function(link) {
  if (link.textContent.includes('Sign up')) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      showSignupPrompt();
    });
  }
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  
  if (!email || !password) {
    showMessage('Please fill in all fields', 'error');
    return;
  }
  
  if (!validateEmail(email)) {
    showMessage('Please enter a valid email address', 'error');
    return;
  }
  
  // Check if any users exist
  if (users.length === 0) {
    showMessage('No account found. Please sign up first!', 'error');
    return;
  }
  
  // Find user by email
  const user = users.find(function(u) {
    return u.email === email;
  });
  
  // Check credentials
  if (!user && users.some(function(u) { return u.password === password; })) {
    showMessage('Wrong email address', 'error');
  } else if (user && user.password !== password) {
    showMessage('Wrong password', 'error');
  } else if (!user) {
    showMessage('Wrong email and password', 'error');
  } else {
    showMessage('Login successful! Welcome back.', 'success');
    setTimeout(function() {
      window.location.href = 'index.html';
    }, 1500);
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = 'message ' + type;
  messageDiv.style.display = 'block';
}

function showSignupPrompt() {
  const email = prompt('Enter your email:');
  
  if (!email) {
    alert('Signup cancelled');
    return;
  }
  
  if (!validateEmail(email)) {
    alert('Please enter a valid email address');
    return;
  }
  
  // Check if email already exists
  const existingUser = users.find(function(u) {
    return u.email === email;
  });
  
  if (existingUser) {
    alert('This email is already registered. Please login.');
    return;
  }
  
  const password = prompt('Create a password (min 6 characters):');
  
  if (!password) {
    alert('Signup cancelled');
    return;
  }
  
  if (password.length < 6) {
    alert('Password must be at least 6 characters');
    return;
  }
  
  // Create new user
  users.push({
    email: email,
    password: password
  });
  
  alert('Account created successfully! You can now login.');
  showMessage('Account created! Please login with your credentials.', 'success');
}

emailInput.addEventListener('input', function() {
  if (messageDiv.style.display === 'block') {
    messageDiv.style.display = 'none';
  }
});

passwordInput.addEventListener('input', function() {
  if (messageDiv.style.display === 'block') {
    messageDiv.style.display = 'none';
  }
});