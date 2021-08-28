const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect("mongodb+srv://projectStrawberrynet:<password>@cluster0.tg80g.mongodb.net/sample?retryWrites=true&w=majority", {
                useNewUrlParser: true,//<password> => Akhil.Mohit.Piyush.Chandan
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });
}