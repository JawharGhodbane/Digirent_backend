const mongoose = require("mongoose");
exports.connect = () => {
    // CONNECT MONGOOSE

    mongoose.connect(process.env.URI, { useNewUrlParser: true })
        .then((result) => console.log('Connecting to Database '))
        .catch((err) => console.log(err));

    // CHECKING CONNECTION
    const db = mongoose.connection
    db.once('open', _ => {
        console.log('Database connected:', process.env.URI)
    })

    db.on('error', err => {
        console.error('connection error:', err)
    })
};