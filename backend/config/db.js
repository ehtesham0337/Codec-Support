const mongoose = require('mongoose')

const uri = process.env.MONGO_URI;
if (typeof uri !== 'string') {
    throw new Error('MONGO_URI must be a string');
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)    
    }
}

module.exports = connectDB