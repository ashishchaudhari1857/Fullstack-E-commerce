const   jwt =  require("jsonwebtoken");
const  Jwt_Creator =(email ,userId)=>{
    let token = jwt.sign(
        { _id: userId ,email: email },
        "Ashish",
        { expiresIn: "1h" }
      ); // secrete key we are  settting here
      
     return token;
}

  
    module.exports= Jwt_Creator;