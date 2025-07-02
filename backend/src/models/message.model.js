import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 500
        },
        author: {
            type: String,
            required: true
        },
        authorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        likes: {
            type: Number,
            default: 0
        },
        likedBy: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }]
    },
    {
        timestamps: true
    }
)

export const Message = mongoose.model("Message", messageSchema)
export default Message; 