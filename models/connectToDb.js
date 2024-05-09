const mongoose = require('mongoose');

const connectToDB = async (url) => {
    mongoose.connect(url , {
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    const connection = mongoose.connection;
    connection.once("open" , () => console.log("Database connection succesfull"));
    connection.on("error" , (err) => {
        console.log("Error occured" + err);
        process.exit();
    })

}

module.exports = connectToDB ;