const express = require('express')
const cors = require('cors')
const router = express.Router()
const User = require('../models/User')

router.post('/login', cors(), async (req,res)=>{
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    await user.save().then(() => res.send({status:'success'})).catch(()=>res.send({status:'failed'}))
})

module.exports = router