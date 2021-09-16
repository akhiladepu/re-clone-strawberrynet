const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect("mongodb+srv://akhil:akhil@cluster0.tg80g.mongodb.net/sample?retryWrites=true&w=majority", {
        useNewUrlParser: true,// <password> => akhil
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
}