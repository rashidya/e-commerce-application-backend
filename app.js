const express = require('express');
const mongoose = require('mongoose')
const app = express();
const port = 4000;
const cors = require('cors');

const {authenticateToken}=require('./middleware/authenticateToken')

const items = require('./routes/items')
const customer = require('./routes/customer')
const sales = require('./routes/sales')
const user = require('./routes/user')
const auth = require('./routes/auth')


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
// Use the cors middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true, // Allow credentials (cookies, authorization headers)
}));

app.use(express.json())
app.use('/item',  items)
app.use('/customer',  customer)
app.use('/sales',  sales)
app.use('/user',  user)
app.use('/auth',  auth)

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});