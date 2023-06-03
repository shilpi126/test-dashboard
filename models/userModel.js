const mongoose=require('mongoose');
const emailValidator=require('email-validator');
const bcrypt=require('bcrypt');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8,
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
            return this.confirmPassword==this.password
        }
    },
    role:{
        type:String,
        enum:["manufacturer","transporter"]
    }

})


userSchema.pre('save',async function(){
    let salt=await bcrypt.genSalt();
    let hashedString=await bcrypt.hash(this.password,salt);
    this.password=hashedString;
})


userSchema.pre('save',function(){
    this.confirmPassword=undefined;
  });


const userModel=mongoose.model('userModel',userSchema);

module.exports=userModel;