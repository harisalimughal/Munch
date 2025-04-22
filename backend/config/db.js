const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected:${conn.connection.host} `)
        console.log("MONGO_URI from env:", process.env.MONGO_URI); // TEMP debug


        
        
    } catch (error) {
        console.log(`error:${error.message} `);
        
    }
};

module.exports = connectDB;