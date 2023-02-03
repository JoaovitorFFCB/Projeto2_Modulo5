const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('sequelize2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

/*try{
    sequelize.authenticate()
    console.log('Conectado ao DB!');
} catch{
    console.error('Não foi possível conectar: ', error);
}*/

module.exports = sequelize