import bcrypt from "bcrypt";
import {db} from "../config/database";
import {User} from "../types";

export async function createUser(email: string, password: string, firstName: string, lastName: string) {

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.run(
        `INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)`,
        email,
        hashedPassword,
        firstName,
        lastName
    );
}

export async function updateUserPassword(userId: number, newPassword: string): Promise<void> {
    await db.run(
        `UPDATE users SET password = ? WHERE id = ?`,
        newPassword,
        userId
    );
}

export async function getUserByEmail(email?: string) {
    if (!email) {
        throw new Error('Email is required!')
        return
    }
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ?', email, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row as User || null);
            }
        });
    });
}

export async function getUserById(id: number) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users where id=(?)',id, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

export async function getAllUsers() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users', (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}