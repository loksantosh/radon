const jwt = require("jsonwebtoken");


const auth= function ( req, res, next) {
  
     let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
if (!token) return res.send({ status: false, msg: "token must be present" });
 let decodedToken = jwt.verify(token, "functionup-radon");
 let userTobeModified =req.params.userId
 let userLoggedIn = decodedToken.userId
if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });
    if(userTobeModified !=userLoggedIn) return res.send({status:false,msg:"You are not Authorized"})
 
    next()
}



module.exports.auth= auth