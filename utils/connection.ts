//IMPORT MONGOOSE
import mongoose, { Model } from "mongoose"

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { DATABASE_URL } = process.env

// connection function
export const connect = async () => { 
  const conn = await mongoose
    .connect(DATABASE_URL as string).then(data=>console.log("Mongoose Connection Established"))
    .catch(err => console.log(err))
  

  // OUR TODO SCHEMA
  const TodoSchema = new mongoose.Schema({
    item: String,
    completed: Boolean,
  },{ collection: "todos" })

  // OUR TODO MODEL
  const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema)

  return { conn, Todo }
}