import {db} from "../config/database";

export async function createVideoForUser(title: string, description: string, userId: number, url: string){
    return new Promise((_, reject) => {
        db.run(
            `INSERT INTO videos (title, description, userId, url) VALUES (?, ?, ?, ?)`,
            [title, description, userId, url],
             ((err) => {
                if (err) {
                    reject(err);
                }
            })
        );
    });
}
export async function updateVideoForUser(id: number, title: string, description: string, url: string) {
     await db.run(
        `UPDATE videos SET title = ?, description = ?, url = ? WHERE id = ?`,
        title,
        description,
        url,
        id
    );
}

export async function getVideoById(id: number) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM videos WHERE id = ?`, id, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        })
    })
}

export async function deleteVideoFromUser(id: number) {
    await db.run(`DELETE FROM videos WHERE id = ?`, id);
}

export async function getVideosByUserId(userId: number) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM videos WHERE userId = ?`, userId, (err, rows) => {
            if(err)
                reject(err);
            else {
                resolve(rows);
            }
        })
    })
}