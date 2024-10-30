import sqlite3 from "sqlite3";
import * as fs from "fs";
import path from "path";

const dbFile = path.resolve(__dirname, "../../database/database.sqlite");
const dbExists = fs.existsSync(dbFile)

if (!dbExists) {
    fs.openSync(dbFile, 'w');
}

export const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else if (!dbExists) {
        db.run(
            `CREATE TABLE users (
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
                firstName TEXT,
                lastName TEXT,
                password TEXT,
                email TEXT
            )`,
            (err) => {
                if (err) {
                    console.error("Error creating table:", err.message);
                }
            }
        );

    }
});