const express = require('express')
const bodyParser = require('body-parser');
const database = require('./connection')
const router = express.Router()
router.use(bodyParser.json())



router.use(bodyParser.json())

router.post('/delete-data', (req, res) => {
    const value = req.body.userid

    database.query('DELETE FROM Users Where userid = ?', value, (err, res) => {
        if (err) {
            console.log(err)
        }
        console.log(res)
    })
    res.json('deleted')

})
module.exports = router;

