import mongoose, { Schema } from "mongoose";   // syntax is like this
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            minlength: 1,
            maxlength: 10
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 8
        },
        fullName: {
            type: String,
            required: true,
            minlength: 1,
            maxLength: 10
        }
    },

    {
        timestamps: true
    }
)

// generating access and refresh tokens

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.ACCESS_REFRESH_SECRET,
        { expiresIn: process.env.ACCESS_REFRESH_EXPIRY }
    )
}

export const User = mongoose.model("User", userSchema)
export default User;
