const   jwt =  require("jsonwebtoken");
require('dotenv').config();

const  Jwt_Creator =(email ,userId)=>{
    let token = jwt.sign(
        { _id: userId ,email: email },
        process.env.TOKENSECRETKEY,
        { expiresIn: process.env.TOKENEXPIRETIME }
      ); // secrete key we are  settting here
      
     return token;
}

  
    module.exports= Jwt_Creator;