import mongoose from "mongoose"


const connectDB = async () => {
  try {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
          useunifiedTopology: true,
    })
    console.log(`MongooDB connected:${conn.connection.host}`.cyan.underline);
  } catch (error) {
      console.log(`Error: ${error}`.red.underline.bold);
      process.exit(1)
  }  
}
export default connectDB