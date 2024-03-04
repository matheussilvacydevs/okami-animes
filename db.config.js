require("dotenv").config();
const mongoose = require("mongoose");

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;


const Connection = () => {
    mongoose.connect(
        `mongodb+srv://${user}:${pass}@apinode.rf5eick.mongodb.net/animes?retryWrites=true&w=majority&appName=APINode`
    ).then(() => {
        console.log("Conectado ao MongoDb");
    }).catch((err) => { console.log(err); })
}

module.exports = Connection;