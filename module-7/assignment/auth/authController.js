import express from 'express';
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import authKey from "../config.js";
import { LocalStorage } from "node-localstorage";

global.localStorage = new LocalStorage('../scratch')

const router = express.Router()

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login',{error:'invalid credentials',msg:null});
        }

        // Compare password
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.render('login',{error:'invalid credentials',msg:null});
        }

        // Generate JWT Token
        const token = await jwt.sign({ id: user._id }, authKey.secret, { expiresIn: "1h" });
        console.log(token)

        global.localStorage.setItem('token',token)
        global.localStorage.setItem('role', user.role)

        // Send response
        res.redirect('/dash')

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('register',{error:'email already exist'})
        }

        // Save new user
        const user = new User(req.body);
        await user.save();

        res.render('login',{error:null, msg:'registered successfully, you can login'})

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


export const authRouter= router