const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Array to store submitted messages
let messages = [];

// Route to handle form submission
app.post('/submit', (req, res) => {
  // Extract form data
  const { name, destination, fromDate, toDate, feedback } = req.body;

  // Store the submitted message
  messages.push({ name, destination, fromDate, toDate, feedback });

  // Redirect to a page displaying stored messages
  res.redirect('/messages');
});

// Route to display stored messages
app.get('/messages', (req, res) => {
  // Construct HTML to display stored messages
  let messageHTML = '<h1>Stored Messages</h1><ul>';
  messages.forEach(msg => {
    messageHTML += `<li>Name: ${msg.name}, Destination: ${msg.destination}, From: ${msg.fromDate}, To: ${msg.toDate}, Feedback: ${msg.feedback}</li>`;
  });
  messageHTML += '</ul>';

  // Display the stored messages
  res.send(messageHTML);
});

// Serve the form HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
