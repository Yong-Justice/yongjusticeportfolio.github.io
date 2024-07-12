// script.js

const form = document.getElementById('contact-form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  const name = document.querySelector('input[name="name"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const message = document.querySelector('textarea[name="message"]').value;

  // Basic Validation
  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return; // Stop further processing
  }
  if (name.trim() === "") {
    alert("Please enter your name.");
    return;
  }
  if (message.trim() === "") {
    alert("Please enter a message.");
    return;
  }

  // Sanitize Input (Basic Example)
  const sanitizedName = escapeHtml(name);
  const sanitizedEmail = escapeHtml(email);
  const sanitizedMessage = escapeHtml(message);

  // Email service (e.g., using EmailJS)
  // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_PUBLIC_KEY' 
  emailjs.send('service_14ajjoh', 'template_3og3ab5', {
    name: sanitizedName,
    email: sanitizedEmail,
    message: sanitizedMessage
  }, 'AxHqaAdfQC65rECob')
    .then(() => {
      // Display success message
      alert("Message sent successfully!");
      form.reset(); // Clear form fields
    })
    .catch(error => {
      // Display error message
      alert("Error sending message: " + error.text);
    });
});

// Validation Functions
function validateEmail(email) {
  // Use a regular expression for basic email validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Sanitization (Basic Example) - Use a dedicated library for more robust sanitization
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
