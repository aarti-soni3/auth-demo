const mongoose = require('mongoose');

const connectMongo = async () => {

    await mongoose.connect('mongodb://127.0.0.1:27017/auth-demo').then(() => {
        console.log('database connected!')
    }).catch((error) => {
        console.log(error)
    });
}

module.exports = connectMongo