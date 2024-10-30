import { Request, Response } from "express";
import {createUser, getUserByEmail} from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../types";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export const register = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body ;
    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            res.status(400).json({ error: "Email already in use" });
            return ;
        }

        const userId = await createUser(email, password, firstName, lastName);
        res.status(201).json({ id: userId });
    } catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body ;

    try {
        const user = await getUserByEmail(email) as User;
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ error: "Invalid email or password" });
            return
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

