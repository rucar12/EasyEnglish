import { Request, Response } from "express";
import {createUser, getUserByEmail, updateUserPassword} from "../models/users";
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

        const accessToken = jwt.sign({ user }, JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ user }, JWT_SECRET, { expiresIn: '1d' });

        res
            .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
            .header('Authorization', accessToken)
            .status(201)
            .send({accessToken});
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

export const refresh = async (req: Request, res: Response) => {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
         res.status(401).send('Access Denied. No refresh token provided.');
         return
    }

    try {
        const decoded = jwt.verify(refreshToken, JWT_SECRET) as {user?: User};
        const accessToken = jwt.sign({ user: decoded.user }, JWT_SECRET, { expiresIn: '1h' });

        res
            .header('Authorization', accessToken)
            .send({accessToken});
    } catch (error) {
         res.status(400).send('Invalid refresh token.');
         return
    }
};

export const logout = (req: Request, res: Response) => {
    res
        .clearCookie('refreshToken', { httpOnly: true, sameSite: 'strict' })
        .status(200)
        .json({ message: 'Logged out successfully' });
};


export const changePassword = async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body;

    const refreshToken = req.cookies['refreshToken'];
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as {user?: User};
    const user = decoded.user;
    console.log(decoded, refreshToken, 'here')
    try {
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            res.status(401).json({ error: "Current password is incorrect" });
            return;
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await updateUserPassword(user.id!, hashedPassword);

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ error: "Password change failed" });
    }
};
