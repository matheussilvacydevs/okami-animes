const Connection = require('./db.config');

class Loaders{
start(){
    Connection();
}
}

module.exports = new Loaders;