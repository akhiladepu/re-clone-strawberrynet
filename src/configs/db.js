const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect("mongodb+srv://projectStrawberrynet:Akhil.Mohit.Piyush.Chandan@cluster0.tg80g.mongodb.net/sample?retryWrites=true&w=majority", {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });    
}