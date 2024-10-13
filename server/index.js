const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./config/db')
const cors = require('cors')


app.use(cors())
const port = process.env.PORT || 8000

// app.use(express.static('public'))


app.use(express.urlencoded({extended: false}))

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    })
})
.catch((err) => {
    console.log("Mongodb Connection failed", err);
    
})




app.get('/', (req, res) => {
    res.send('<h1>Galaxy Glide</h1> <a href="/auth/google">Authenticate With Google</a>')
})




// route setup
app.use('/auth', require('./routes/auth'))

