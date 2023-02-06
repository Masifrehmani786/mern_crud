const mongoose = require("mongoose");
const DB='mongodb+srv://.mofjtft.mongodb.net/?retryWrites=true&w=majority'
mongoose.set("strictQuery", false);
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
}).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));