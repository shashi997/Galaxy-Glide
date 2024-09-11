const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./db/db')

const port = process.env.PORT || 8000

// app.use(express.static('public'))
app.set('view-engine', 'ejs')

app.use(express.urlencoded({extended: false}))

connectDB()

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})


app.get('/', (req, res) => {
    res.send("<h1>Galaxy Glide</h1>")
})

// route setup
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))

