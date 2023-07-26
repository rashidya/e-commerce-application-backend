const express = require('express');
const mongoose = require('mongoose')
const app = express();
const port = 4000;

const items = require('./routes/items')
const customer = require('./routes/customer')
const sales = require('./routes/sales')
const supplier = require('./routes/supplier')
const user = require('./routes/user')


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
app.use('/item',  items)
app.use('/customer',  customer)
app.use('/supplier',  supplier)
app.use('/sales',  sales)
app.use('/user',  user)

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});