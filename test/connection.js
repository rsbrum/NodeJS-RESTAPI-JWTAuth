const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {

    mongoose.connect('mongodb://localhost/jwtdb');
    mongoose.connection.once('open', () => {
        console.log("Database test connection was succesfull");
    }).on('error', (error) =>{
        console.log("Connection error " + error );
    })

});