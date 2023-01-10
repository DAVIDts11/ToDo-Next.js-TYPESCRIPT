import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{ type: String, required: true },
    todos: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Todo',
        },
      ],
 },{ collection: "users" });

export default mongoose.models.User || mongoose.model("User", userSchema);

