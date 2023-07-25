const express = require('express');
const app = express();
const port = 4000; // You can change the port number as needed

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the POS system!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});