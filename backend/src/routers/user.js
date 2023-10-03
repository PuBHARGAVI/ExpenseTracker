const express = require('express')
const cors = require('cors')
const router = express.Router()
const User = require('../models/User')

router.post('/signup', cors(), async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  const token = await user.generateAuthenticationToken();
  user.tokens = user.tokens.concat({token});

  await user
    .save()
    .then(() => res.send({status: 'success',token: token}))
    .catch(() => res.send({status: 'failed'}));
});

router.post('/login', cors(), async (req,res)=>{
  let user = await User.findByCredentials(req.body.email);

  if(!user){
    res.send({status:'Create an account to continue'})
  }

  else if(user.password !== req.body.password ){
    res.send({status: 'password is invalid'})
  }
  else{
    const token = await user.generateAuthenticationToken();
    user.tokens = user.tokens.concat({token})

    await user.save().then(() => res.send({status:'success',token: token})).catch(()=>res.send({status:'failed'}))
  }
})

module.exports = router