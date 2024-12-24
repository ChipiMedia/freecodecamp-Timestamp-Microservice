// index.js
// Timestamp Microservice Project Implementation

// Initialize the project
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for cross-origin access
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Serve the main landing page
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API implementation for timestamp microservice
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;
  let parsedDate;

  // Handle cases with no date provided
  if (!date) {
    parsedDate = new Date();
  } else {
    // Handle Unix timestamps (ensure numeric strings are treated as integers)
    if (!isNaN(date)) {
      parsedDate = new Date(parseInt(date));
    } else {
      parsedDate = new Date(date); // Parse as an ISO 8601 string or other formats
    }
  }

  // Check for invalid dates
  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return the Unix and UTC format
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running and listening on port ${PORT}`);
});



