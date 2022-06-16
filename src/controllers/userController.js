const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  try {

    let data = req.body;
    let savedData = await userModel.create(data);

    res.status(201).send({ msg: savedData });
  }
  catch (err) {
    res.status(500).send({ Error: err.message })
  }
};

const loginUser = async function (req, res) {
  try{
    let userName = req.body.emailId;
    let password = req.body.password;

    let user = await userModel.findOne({ emailId: userName, password: password });

    if (!user)
      return res.status(400).send({
        status: "false",
        msg: "username or the password is not correct",
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
    {}
  }
  catch (error) {
    res.status(500).send({ err: error.message })
  }
};




const getUserData = async function (req, res) {
  try{

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.status(404).send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
  }
  catch(error){
    res.status(500).send({err:error.message})
  }
};





const updateUser = async function (req, res) {
  try{
  

  let userId = req.params.userId;
  let user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).send("No such user exists");
  }

  // let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { $inc: { age: 2 } }, { new: true });
  res.send({ data: updatedUser });
}
catch(error){
  res.status(500).send({err:error.message})
}
}






const deleteUser = async function (req, res) {
  
try{

  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.status(404).send("No such user exists");
  }


  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { $set: { isDeleted: true } }, { new: true });


  res.send({ data: updatedUser });
}
catch(error){
  res.status(500).send({err:error.message})
}
};


const posts = async function (req, res) {
  try{

  let user = await userModel.findById(req.params.userId)
  if (!user) return res.status(404).send({ status: false, msg: 'No such user exists' })
  let message = req.body
  let updatedPosts = user.posts
  updatedPosts.push(message)
  let updatedUser = await userModel.findOneAndUpdate({ _id: user._id }, { posts: updatedPosts }, { new: true })

  //return the updated user document
  return res.send({ status: true, data: updatedUser })
  }
  catch(error){
    res.status(500).send({err:error.message})
  }
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.posts = posts