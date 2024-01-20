import mongoose from 'mongoose'


mongoose.set('strictQuery', false);

export const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Database is on air");
    } catch (error) {
        console.log(error)
    }
}