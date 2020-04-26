const express = require('express');
const router = express.Router();
const URI_FRONT='http://localhost:4200';
//const {isAuthenticated } = require('../helpers/auth');

const object = require('../controllers/object.controller');

//router.get('/notes/add',/*isAuthenticated,*/object.addObject);

router.post('/object-found',/*isAuthenticated,*/object.createObject);

router.get('/object-lost',/*isAuthenticated,*/object.getObjects);

//router.get('/notes/edit/:id',/*isAuthenticated,*/ object.getObject);

//router.put('/notes/edit-note/:id',/*isAuthenticated,*/object.editObject);

//router.delete('/notes/delete/:id',/*isAuthenticated,*/object.deleteObject);
/**/
module.exports = router;