// index.js
//  Timestamp Microservice Project Implementation

// initialize the project
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for cross origin access
app.use(cors({ optionsSuccessStatus: 200 }));

// serve static files from "public" directory
app.use(express.static('public'));

// serve the main landing page
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API implementation for timestamp microservice
app.get("/api/:date?", (req, res) => {
  const { date } = req.params
  let parsedDate;

// Handle cases with no date provided
if(!date) {
  parsedDate = newDate();
} else {
  // If the date is a valid Unix timestamp, parse a number
  if(!isNaN(date)) {
    parsedDate = new Date(parseInt(date));
  } else {
    parsedDate = newDate(date); // Parse as a new date string
  }
}

// Handle invalid dates 
if(parsedDate.tostring() === "Invalid Date") {
  console.log(`invalid Date Encountered: ${date}`); // Log the invalid date for debugging
  return res.json({ errror: "Invalid Date" });
}

// Log successful requests for monitoring
console.log(`Valid Request Processed: Date=${parsedDate.toUTCString()}`);

// Return the Unix and UTC format
res.json({
  unix: parsedDate.getTime(),
  utc: parsedDate.toUTCSTRING(),
  });
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start the server with error handling
const PORT = process.env.PORT || 3000;
const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`App is running and listening on port ${PORT}`);
    }).on('error', (err) => {
      console.error(`Failed to start server: $err.message}`);
      process.exit(1); // Exit with failure code
    });
  } catch (error) {
    console.error(`Unexpected error while starting server: ${error.message}`);
    process.exit(1); // Exit with failure code
  }
};

startServer();
