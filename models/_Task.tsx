import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userName:{ type: String, required: true },
    tasks : [{
        task: { type: String },
        completed: { type: Boolean, default: false },
         }]
 });

export default mongoose.models.Task || mongoose.model("Task", taskSchema);

/// https://dev.to/alexmercedcoder/building-a-full-stack-todo-list-with-mongodb-nextjs-typescript-2f75