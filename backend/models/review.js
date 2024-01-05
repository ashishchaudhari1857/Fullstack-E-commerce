const sequelize =require('../config/dbconfig');
const Sequelize=require('sequelize');

const Reviews =sequelize.define("review" ,{
        rating:{
            type:Sequelize.INTEGER,
            allowNull:false
            },
            description:{
                type:Sequelize.TEXT,
                allowNull:true
        }
})


module.exports= Reviews;