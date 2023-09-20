const mysql = require('mysql')

const database = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'UserProduct'
})

database.connect((err)=>{
    if(err){
        console.log(err)
        return
    }

    console.log('connected to the database')

})

database.on('error', (err)=>{
    console.log(err)
})

module.exports = database