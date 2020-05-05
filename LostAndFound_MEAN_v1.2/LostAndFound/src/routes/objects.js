const express = require('express');
const router = express.Router();
const URI_FRONT='http://localhost:4200';
const {isAuthenticated } = require('../helpers/auth');

const object = require('../controllers/object.controller');

//router.get('/notes/add',/*isAuthenticated,*/object.addObject);

router.get('/object-found',isAuthenticated,object.getAccess);

router.post('/object-found',isAuthenticated,object.createObject);

router.get('/object-lost',isAuthenticated,object.getObjects);


router.get('/user/objects/:id',isAuthenticated,object.getUserObjects);


router.put('/user/objects/:id',isAuthenticated,object.editObject);

router.delete('/user/objects/:id',isAuthenticated,object.deleteObject);
/**/
module.exports = router;