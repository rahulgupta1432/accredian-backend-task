const express = require('express');
const { createReferral } = require('../controllers/referralController.js');
const router = express.Router();

router.post('/referrals', createReferral);

router.get("/ref",(req,res)=>{
    res.send("Hello");
})
module.exports = router;
