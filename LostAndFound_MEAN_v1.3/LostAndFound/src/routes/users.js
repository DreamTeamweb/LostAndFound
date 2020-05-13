const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth');
const user = require('../controllers/user.controller');

router.get('/users/signin', (req, res) => {
  res.render('users/signin')
});

router.post('/signin', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return res.json({ success: false,message:error}); }
    if (!user) { return res.json({ success: false,message:info.message}); }
    req.logIn(user, function (err) {
      if (err) { return res.json({ success: false,message:err}); }
      return res.json({ success: true,message:'Login success' });
    });
  })(req, res, next);
});

router.get('/logout', isAuthenticated, function (req, res, next) {
  req.logout();
  return res.status(200).json({ message: 'Logout Success' });
})
/*router.get('/users/signup', (req,res)=>{
    res.render('users/signup')
});
*/
router.post('/signup',user.createUser);


router.get('/user/in/:id',isAuthenticated, user.getUser);

router.put('/user/edit/:id',isAuthenticated, user.editUser);

router.get('/user',isAuthenticated,function(req,res,next){
  return res.status(200).json(req.user);
});

/*router.get('/users/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});*/

//TESTING MAIL CONFIRMATION
router.put('/activate/:token', user.activateUser);


module.exports = router;