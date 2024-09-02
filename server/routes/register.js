const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('register.ejs')
})

router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(req.body.name);
        console.log(req.body.email);
        console.log(req.body.password);
        
        console.log(hashedPassword);
        res.redirect('/login')
    }
    catch {
        res.redirect('/register')
    }
})

module.exports = router