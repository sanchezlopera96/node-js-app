const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        console.log('Inicializando llamado a DB');
        await mongoose.connect('mongodb://user_db:ODc7uWxS0UfSqKgZ@cluster0-shard-00-00.pkpde.mongodb.net:27017,cluster0-shard-00-01.pkpde.mongodb.net:27017,cluster0-shard-00-02.pkpde.mongodb.net:27017/iud-inventarios?ssl=true&replicaSet=atlas-zsnyos-shard-0&authSource=admin&retryWrites=true&w=majority');
        console.log('Estoy conectado');
    } catch(error) {
        console.log('Fallo la conexión a la base de datos');
    }
}

module.exports = {
    getConnection,
}