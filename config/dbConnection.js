const mongoose = require('mongoose');
/**
 * Function to connect to the database
 * returns {Promise<void>}
 */
const connectDB = async () =>{
    try {
        // Connect to the database using the provided connection string
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        
        // Log the successful connection details
        console.log("DB connected: ", "\nHOST: ", connect.connection.host, "\nNAME: ", connect.connection.name);
        
    } catch (err) {
        // Log any errors that occur during the connection process
        console.log(err);
        
        // Exit the process with a non-zero exit code to indicate failure
        process.exit(1);
    }
}

module.exports = connectDB;