var express = require('express');
var router = express.Router();
const User = require('../models/users');
const sanitizeUser = require('../utils/sanitzeUser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/passport.cred');



router.get('/me', (req, res, next) => {
  res.status(200).json({
    user: {
      _id: req.user._id,
      name: req.user.name
    }
  });
});

router.get('/all', async (req, res, next) => {
  try {
    const result = await User.find({ _id : { $ne: req.user._id } } );
    const users = sanitizeUser(result);
    res.status(200).json({ users });
  } catch(err) {
    res.status(500).json({ msg:'Internal server error' });
  }
});

router.put('/location', async (req, res, next) => {
  const { longitude, latitude } = req.body;
  try{
    const updatedCoords = await User.findByIdAndUpdate(req.user._id, { longitude, latitude });
    res.status(200).json({ coords: { longitude, latitude } });
  } catch(err){
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

     //POST register form handle
     router.post('/register', async (req, res, next) => {
           //Get the values from request
           let name = req.body.name;
           let mass = req.body.mass;
           let volume = req.body.volume;
           let address = req.body.address;
           //validate data sent to server
           console.log(name);


           const errors = req.validationErrors();
           if (errors) {
             res.status(400).json(errors);
           } else {
             try {
               let user = new User({
                 name: name,
                 mass: mass,
                 volume: volume,
                 address: address,
               });
               let result = await user.save();
               res.status(200).json({msg: 'Success'});
             } catch (err) {
               console.log(err);
               res.status(409).json({msg: err.errmsg || 'Conflict!'});
             }
           }
         }
     );
     // POST signin
     /*router.post('/authenticate', passport.authenticate('login', { session: false }), function(req, res, next){
       console.log(req.body);
       const usr = { id: req.user._id };
       const token = jwt.sign(usr,config.secret, { expiresIn: '24h'});
       res.status(200).json({token: `${token}`, succes: true});
     });*/

     router.get('/authorize', passport.authenticate('jwt', { session: false }), function(req, res, next){
       res.status(200).send('Success');
     });

     router.get('/delete/:id', async function(req, res, next){
       const user = await User.findByIdAndDelete(req.params.id );
       res.status(200).json(user);
     });

     module.exports = router;
