const express = require('express')
const app = express()
require('dotenv').config()

const mongoose = require('mongoose')

app.use(express.static('public'))

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DB is connected");
        app.listen(process.env.PORT || 8000, () => {
            console.log(`App listening on port ${process.env.PORT || 8000}`);
        })
    })
    .catch((e) => {
        console.log(e);
})

app.get('/', (req, res) => {
    res.send({ title: 'Galaxy Glide Game'})
})

