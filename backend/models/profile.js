const Sequelize =require('sequelize');
const sequelize= require('../config/dbconfig')


const  Profile = sequelize.define('profile' ,{
    id: {type :Sequelize.INTEGER, primaryKey:true, autoIncrement: true},
    user_id:{ type : Sequelize.STRING(50), allowNull: false },
    name: { type : Sequelize.STRING(100) } ,
    email: { type : Sequelize.STRING(254), unique: true} ,
    phone: { type : Sequelize.BIGINT} ,
    address: { type : Sequelize.TEXT} ,
    gender: { type : Sequelize.ENUM("male", "female")} ,
    dob: { type : Sequelize.DATEONLY}
    })
    
    module.exports=Profile;
