const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/InspireJournal', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(db => {
    console.log(`Connected to MongoDB: ${db.connection.host}`)
})
.catch(err => {
    console.log("Error connecting to DB: " + err);
})
