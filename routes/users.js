const router = require('express').Router()
const User = require('../models/User')
const Account = require('../models/Account')
const bcrypt = require('bcrypt')
const verify = require('../middlewares/tokenVerify')


router.post('/', async (req, res) => {
    try {

        // Validate password length
        if (req.body.password.length <8) {
            res.status(400).json({error: 'Password too short'})
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // Create user
        const newUser = new User({name: req.body.name, username: req.body.username, password: hashedPassword})
        await newUser.save()

        // Create account
        const newAccount = new Account({user: newUser._id})
        await newAccount.save()

        res.status(201).json()

    } catch (error) {
        res.status(400).json({error: error.message})
    }
})


module.exports = router