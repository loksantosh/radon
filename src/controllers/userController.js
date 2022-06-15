const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  
  let data = req.body;
  let savedData = await userModel.create(data);
  
  res.send({ msg: savedData });
};

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });

  
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "radon",
      organisation: "FunctionUp",
    },
    "functionup-radon"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};




const getUserData = async function (req, res) {
  // let token = req.headers["x-Auth-token"];
  // if (!token) token = req.headers["x-auth-token"];

  
  // if (!token) return res.send({ status: false, msg: "token must be present" });

  // let decodedToken = jwt.verify(token, "functionup-radon");
  // console.log(decodedToken)
  // if (!decodedToken) return res.send({ status: false, msg: "token is invalid" });
    

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
};





const updateUser = async function (req, res) {
//   let token = req.headers["x-Auth-token"];
//   if (!token) token = req.headers["x-auth-token"];

 
//   if (!token) return res.send({ status: false, msg: "token must be present" });
// let decodedToken = jwt.verify(token, "functionup-radon");
//   if (!decodedToken)
//     return res.send({ status: false, msg: "token is invalid" });


  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  
  if (!user) {
    return res.send("No such user exists");
  }

  // let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, {$inc :{age:2}},{new:true});
  res.send({  data: updatedUser });
};







const deleteUser = async function (req, res) {
  // let token = req.headers["x-Auth-token"];
  // if (!token) token = req.headers["x-auth-token"];

  
  // if (!token) return res.send({ status: false, msg: "token must be present" });

  // console.log(token);
  
  
  // let decodedToken = jwt.verify(token, "functionup-radon");
  // if (!decodedToken)
  //   return res.send({ status: false, msg: "token is invalid" });


  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.send("No such user exists");
  }

 
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, {$set :{isDeleted:true}},{new:true});
  
    
  res.send({  data: updatedUser });
};


const posts = async function (req, res) {
  
  let user = await userModel.findById(req.params.userId)
    if(!user) return res.send({status: false, msg: 'No such user exists'})
    let message =req.body
    let updatedPosts = user.posts
    updatedPosts.push(message)
    let updatedUser = await userModel.findOneAndUpdate({_id: user._id},{posts: updatedPosts}, {new: true})

    //return the updated user document
    return res.send({status: true, data: updatedUser})
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.posts = posts