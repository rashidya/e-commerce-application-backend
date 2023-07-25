const express = require('express');
const mongoose = require('mongoose')
const app = express();
const port = 4000;

const products = require('./routes/products')


const url = 'mongodb://127.0.0.1/e-commerce-application-schema'

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the POS system!');
});

con.on("open", () => {
    console.log('MongoDB connected!');
})

app.use(express.json())
app.use('/products',  products)

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});