const Sequelize = require('sequelize');
const db = require('../database/db');

const Categories = db.define('categories',{
  id: {
    type: Sequelize.INTEGER,  
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name:{
    type: Sequelize.STRING(50),
    allowNull: false

  },
  description:{
    type: Sequelize.STRING,
    allowNull: true

  }
})

//Criar a tabela com sequelize
// Categories.sync();

// Excluir a tabela e criar novamente
// Categories.sync({force: true})

// verificar se há alguma diferença na tabel, raliza alteração
// Categories.sync({alter:true});


module.exports = Categories;