const Sequelize =require('sequelize');
const sequelize= require('../config/dbconfig')


const  Profile = sequelize.define('profile' ,{
    id: {type :Sequelize.INTEGER, primaryKey:true, autoIncrement: true},
    name: { type : Sequelize.STRING(100) } ,
    email: { type : Sequelize.STRING(254)} ,
    phone: { type : Sequelize.BIGINT} ,
    address: { type : Sequelize.TEXT} ,
    gender: { type : Sequelize.ENUM("male", "female")} ,
    dob: { type : Sequelize.DATEONLY},
    ImgUrl:{type:Sequelize.TEXT},
    role:{type:Sequelize.TEXT}

    })
    
    module.exports=Profile;
