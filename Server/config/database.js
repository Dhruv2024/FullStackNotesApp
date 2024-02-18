const mongoose = require('mongoose');
require('dotenv').config();
const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => { console.log("DB Connected Successfully"); })
        .catch((err) => {
            console.log("Error occurred while connecting to db");
            console.log(err);
        })
}

module.exports = dbConnect;