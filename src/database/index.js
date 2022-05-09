import mongoose from "mongoose";


const connectDb = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/api-template', {
        useNewUrlParser: true,
    });
}

const getDb = () => {
    return mongoose;
}

export { connectDb, getDb };
