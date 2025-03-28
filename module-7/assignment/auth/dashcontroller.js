import express from "express";
import jwt from "jsonwebtoken";
import authKey from "../config.js";
import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";
import { LocalStorage } from "node-localstorage";

global.localStorage = new LocalStorage("../scratch"); // Ensure a valid path
const route = express.Router();

// 🟢 GET Admin Dashboard
route.get("/", async (req, res) => {
    try {
        const token = global.localStorage.getItem("token");
        const role = global.localStorage.getItem("role");

        if (!token) {
            return res.render("login", { error: "Unauthorized access. Please login first.",msg:null });
        }

        const decoded = jwt.verify(token, authKey.secret);

        if (decoded && role === "admin") {
            const products = await Product.find();
            return res.render("adminDash", { products, error: null });
        } else if (decoded && role === "user") {
            const products = await Product.find();
            return res.render("userDash", { products, error: null });
        } else {
            return res.render("login", { error: "Authentication Failed", msg:null });
        }
    } catch (err) {
        return res.render("login", { error: "Session expired. Please login again.", msg:null });
    }
});

// 🟢 ADD Product
route.post("/product", async (req, res) => {
    try {
        const token = global.localStorage.getItem("token");
        const role = global.localStorage.getItem("role");

        if (!token) {
            return res.render("login", { error: "Unauthorized access. Please login first.",msg:null });
        }

        const decoded = jwt.verify(token, authKey.secret);
        if(decoded && role==='admin'){
        const { productId, productName, description, price } = req.body;
        const newProduct = new Product({ productId, productName, description, price });
        await newProduct.save();
        res.json({ msg: "success" });}
    } catch (err) {
        res.json({ msg: "error", error: err.message });
    }
});

// 🔵 UPDATE Product
route.put("/product", async (req, res) => {
    try {
        const token = global.localStorage.getItem("token");
        const role = global.localStorage.getItem("role");

        if (!token) {
            return res.render("login", { error: "Unauthorized access. Please login first.",msg:null });
        }

        const decoded = jwt.verify(token, authKey.secret);
        if(decoded && role==='admin'){
        const { id, productId, productName, description, price } = req.body;
        await Product.findByIdAndUpdate(id, { productId, productName, description, price });
        res.json({ msg: "success" });}
    } catch (err) {
        res.json({ msg: "error", error: err.message });
    }
});

// 🔴 DELETE Product
route.delete("/product", async (req, res) => {
    try {
        const token = global.localStorage.getItem("token");
        const role = global.localStorage.getItem("role");

        if (!token) {
            return res.render("login", { error: "Unauthorized access. Please login first.",msg:null });
        }

        const decoded = jwt.verify(token, authKey.secret);
        if(decoded && role==='admin'){
        const { id } = req.body;
        await Product.findByIdAndDelete(id);
        res.json({ msg: "success" });}
    } catch (err) {
        res.json({ msg: "error", error: err.message });
    }
});

route.get('/user',async(req,res)=>{
    try{
        const token = global.localStorage.getItem("token");
        const role = global.localStorage.getItem("role");

        if (!token) {
            return res.render("login", { error: "Unauthorized access. Please login first.",msg:null });
        }

        const decoded = jwt.verify(token, authKey.secret);
        if(decoded && role==='admin'){

        const users = await User.find({}, { password: 0 });
       res.render('adminUserDash',{users})
        } 
    }catch(err){
        res.json({ msg: "error", error: err.message });
    }

})

route.put('/user',async(req,res)=>{
    try{
        const token = global.localStorage.getItem("token");
        const role = global.localStorage.getItem("role");

        if (!token) {
            return res.render("login", { error: "Unauthorized access. Please login first.",msg:null });
        }

        const decoded = jwt.verify(token, authKey.secret);
        if(decoded && role==='admin'){
       const {id,name,email,role}= req.body
       await User.findByIdAndUpdate(id,{name,email,role})
       res.json({msg:'success'})
        }
    }catch(err){
        res.json({ msg: "error", error: err.message });
    }

})

route.delete('/user',async(req,res)=>{
    try{
        const token = global.localStorage.getItem("token");
        const role = global.localStorage.getItem("role");

        if (!token) {
            return res.render("login", { error: "Unauthorized access. Please login first.",msg:null });
        }

        const decoded = jwt.verify(token, authKey.secret);
        if(decoded && role==='admin'){
       const {id}=req.body;
       const users= await User.findByIdAndDelete(id)
       res.json({msg:'success'})
        }
    }catch(err){
        res.json({ msg: "error", error: err.message });
    }

})

route.get('/logout',async(req,res)=>{
   await global.localStorage.clear()
    res.redirect('/')
})

export const dashController= route;
