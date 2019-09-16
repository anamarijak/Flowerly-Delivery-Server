var express = require('express');
var router = express.Router();
const User = require('../models/users');
const sanitizeUser = require('../utils/sanitzeUser');


router.get('/all', async (req, res, next) => {
  try {
    const result = await User.find();
    const users = sanitizeUser(result);
      //console.log(users);
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
       let latitude = req.body.latitude;
       let longitude = req.body.longitude;
       //console.log(latitude);


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
               latitude: latitude,
             longitude: longitude,
           });
           let result = await user.save();
           res.status(200).json({msg: 'Success'});
           //const token = jwt.sign(user, config.secret, { expiresIn: '24h'});
           //res.status(200).json({token: `${token}`, success: true});
         } catch (err) {
           console.log(err);
           res.status(409).json({msg: err.errmsg || 'Conflict!'});
         }
       }
     }
 );


router.delete('/delete/:id', async function(req, res, next){
    //console.log(req.params.id);
    const user = await User.findByIdAndDelete(req.params.id);

res.status(200).json(user);
});

module.exports = router;
