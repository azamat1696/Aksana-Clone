const Mongoose = require('mongoose');

const db = Mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (error) => {
    console.log('Error connecting to MongoDB', error);
});

const connectDB = async () => {
    await Mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
}
module.exports = {
    connectDB
};

