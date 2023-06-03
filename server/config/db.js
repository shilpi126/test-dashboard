const mongoose = require("mongoose")


const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        
        console.log("db connected");
        

    }catch (error) {
        
        console.log("Error in mongoose",error);
        
}

}

module.exports = connectDB;