const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")



//protectRoute
module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
      let token;
      if (req.cookies.login) {
        console.log(req.cookies);
        token = req.cookies.login;
        let payload = jwt.verify(token, process.env.SECRET_KEY);
        if (payload) {
          console.log("payload token", payload);
          const user = await userModel.findById(payload.payload);
          req.role = user.role;
          req.id = user.id;
          console.log(req.role, req.id);
          next();
        } else {
          return res.json({
            message: "please login again",
          });
        }
      } else {
        //browser
        const client=req.get('User-Agent');
        if(client.includes("Mozilla")==true){
          return res.redirect('/login');
        }
        //postman
        res.json({
          message: "please login",
        });
      }
    } catch (err) {
      return res.json({
        message: err.message,
      });
    }
  };
  