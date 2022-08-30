const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB,process.env.DB_USER,'',{
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

sequelize.authenticate().then( function(){
  console.log('Conexão com o banco de dados relaizada com sucesso!');
}).catch(function(err){
  console.log(`Erro conexão : ${err}`);
});

module.exports = sequelize;