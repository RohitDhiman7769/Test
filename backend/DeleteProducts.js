const express = require('express')
const bodyParser = require('body-parser');
const database = require('./connection')
const router = express.Router()
router.use(bodyParser.json())



router.use(bodyParser.json())

router.post('/delete-product', (req, res) => {
    const value = req.body.productID

    database.query('DELETE FROM Products Where productID = ?', value, (err, res)=>{
        if(err){
            console.log(err)
        }
        console.log(res)
    })
    res.json('deleted products')

})
module.exports = router;

