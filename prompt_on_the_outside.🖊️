const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser');
const database = require('./connection')

const router = express.Router()
router.use(bodyParser.json())
const storage = multer({ storage: 'storage' })

let userID;


router.post('/Data-inserted', storage.none(), (req, res) => {
    console.log(req.body)

    const username = req.body.userPersonalDetails.username;
    const userdiscription = req.body.userPersonalDetails.userdiscription;
    const userCountry = req.body.userPersonalDetails.usercountry;
    const userstate = req.body.userPersonalDetails.userstate;   
    const userpin = req.body.userPersonalDetails.userpincode;

    //INSERT USER PERSONAL DATA 
    database.query('INSERT INTO Users (userName, userDiscription, userCountry, userState, userPincode) VALUES (?,?,?,?,?)',
        [username, userdiscription, userCountry, userstate, userpin],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            userID = result.insertId


            //INSRT USERS PRODUCTS INSIDE PERSONAL DATA QUERY

            const productDataList = req.body.userPeroductDataList;

            const values = productDataList.map((item) => [
                userID,
                item.serialNumber,
                item.productName,
                item.Price,
                item.quantity,
            ]);

            database.query('INSERT INTO Products ( userid, serialNumber, productName, price, quantity) VALUES ?',
                [values], (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(result)
                })
        })

    res.json('Data Submit')

})
module.exports = router;

