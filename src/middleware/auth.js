const jwt = require("jsonwebtoken");


const auth= function ( req, res, next) {
  try{
     let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
if (!token) return res.status(400).send({ status: false, msg: "token must be present" });
 let decodedToken = jwt.verify(token, "functionup-radon");
 let userTobeModified =req.params.userId
 let userLoggedIn = decodedToken.userId
 if(userTobeModified !=userLoggedIn) return res.status(403).send({status:false,msg:"You are not Authorized"})
 next()
}
 catch(error){
  
    return res.status(401).send({ status: false, msg: error.message});
    
 }
 
 
}



module.exports.auth= auth