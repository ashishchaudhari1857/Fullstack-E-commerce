const Sequelize = require('sequelize')
//   setting the    database connection
const sequelize =new Sequelize("node_again" , "root" , "Ashish@123" ,{
    host: 'localhost',
    dialect: 'mysql', 
});



module.exports =sequelize;