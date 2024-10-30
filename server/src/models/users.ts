import bcrypt from "bcrypt";
import {db} from "../config/database";
import {User} from "../types";

export async function createUser(email: string, password: string, firstName: string, lastName: string) {

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.run(
        `INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)`,
        email,
        hashedPassword,
        firstName,
        lastName
    );
    console.log('-----')
    console.log(result)
    console.log('-------')
    return result;
}

export async function getUserByEmail(email: string) {
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