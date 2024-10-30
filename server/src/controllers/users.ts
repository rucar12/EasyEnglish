import { Request, Response } from "express";
import {createUser, getAllUsers, getUserById} from "../models/users";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.body
    if (!id) {
        res.status(400).json({error: "Cannot find this user"});
        return;
    }
    try {
        const user = await getUserById(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error fetching user" });
    }
};

export const addUser = async (req: Request, res: Response) => {
    const { email, password, name, firstName, lastName } = req.body;

    try {
        const userId = await createUser(email, password, firstName, lastName);
        res.status(201).json({ id: userId });
    } catch (error) {
        res.status(500).json({ error: "Error adding user" });
    }
};
