//IMPORT MONGOOSE
import mongoose, { Model } from "mongoose"

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { DATABASE_URL } = process.env

// connection function
export const connect = async () => { 
  const conn = await mongoose
    .connect(DATABASE_URL as string).then(data=>console.log("Mongoose Connection Established"))
    .catch(err => console.log(err))
  

  // TODO SCHEMA
  const TodoSchema = new mongoose.Schema({
    item: String,
    completed: Boolean,
  },{ collection: "todos" })


  //USER SCHEMA
  const userSchema = new mongoose.Schema({
    userName:{ type: String, required: true },
    todos: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Todo',
        },
      ],
 },{ collection: "users" });

  const User =  mongoose.models.User || mongoose.model("User", userSchema);

  // OUR TODO MODEL
  const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema)

  


  return { conn, Todo , User}
}