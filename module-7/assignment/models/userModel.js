import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, // Ensures no duplicate emails
        lowercase: true,
        trim: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email address",
        ],
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 15,
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value);
            },
            message: "Password must be 8-15 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        },
    },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();  // Avoid re-hashing if not modified

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Create and export the User model
export const User = mongoose.model("ass_7User", userSchema);
