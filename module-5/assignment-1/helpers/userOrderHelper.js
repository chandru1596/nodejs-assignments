import userOrder from "../models/model.js";

export const users_order={

    addOrder: async (body) => {
        try {
            return await new userOrder(body).save();
        } catch (err) {
            console.error("Database Save Error:", err);
            throw err; // Ensure error is thrown to be caught in the route handler
        }
    }
}