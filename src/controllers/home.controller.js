const express = require('express');

const router = express.Router();

router.get('/',function(req,res) {
  res.sendFile('../pages/home.html');
});

module.exports =  router