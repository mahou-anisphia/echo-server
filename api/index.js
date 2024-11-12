// app.js
const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Echo endpoint - accepts GET and POST
app.all("*", (req, res) => {
  const responseData = {
    method: req.method,
    headers: req.headers,
    query: req.query,
    body: req.body,
    params: req.params,
    path: req.path,
    timestamp: new Date().toISOString(),
  };

  res.json(responseData);
});

// Export the app for serverless deployment
module.exports = app;

// If running standalone (not serverless)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
