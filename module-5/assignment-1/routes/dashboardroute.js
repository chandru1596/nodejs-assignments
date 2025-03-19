import express from 'express'
import { dashboard } from '../helpers/dashboardhelper.js'
import nodemailer from "nodemailer";

const router=express.Router()
// Configure Mailjet SMTP
const transporter = nodemailer.createTransport({
    host: "in-v3.mailjet.com",
    port: 587, 
    auth: {
        user: "f5c9927dd3097ebb6b03dcfcf5d55498", 
        pass: "62393e17a6e6de51aef44cc6b933cbeb" 
    },
    tls: {
        rejectUnauthorized: false 
    }
});  

const sendEmail = async (toEmail, status) => {
    const mailOptions = {
        from: "chandruvel.1596@gmail.com",
        to: toEmail, 
        subject: "Order Status Update",
        text: `Hello, Your order status is: ${status}`
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent:", info.messageId);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};

router.get('/',async(req,res)=>{
    try{
     const result = await dashboard.allOrders()
     console.log(result)
     result? res.json(result):res.status(404).json({message:'orders not found'})
    }
    catch(err){
        res.status(500).json({error:'DB error'})

    }
    })

    router.post('/send-mail', async (req, res) => {
        try {
            const { mail, status } = req.body;
            console.log("Received data:", { mail, status });
    
            if (!mail || !status) {
                return res.status(400).json({ error: "Email and status are required" });
            }
    
            await sendEmail(mail, status); 
    
            res.json({ success: true, message: "Email sent successfully" });
        } catch (err) {
            console.error("Error sending email:", err);
            res.json({ success: false, error: err.message });
        }
    });

  
  export const dashboardRoute= router  