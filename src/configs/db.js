const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect("mongodb+srv://teamStrawberrynet:<password>@strawberrynet.5k8ay.mongodb.net/sample?retryWrites=true&w=majority", {
        useNewUrlParser: true,// <password> => Akhil.Mohit.Piyush.Chandan
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
}