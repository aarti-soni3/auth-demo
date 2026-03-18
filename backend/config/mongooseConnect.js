const mongoose = require('mongoose');

const connectMongo = async () => {

    await mongoose.connect(process.env.CONNECTION_STRING).then(() => {
        console.log('database connected!')
    }).catch((error) => {
        console.log(error)
    });
}

module.exports = connectMongo