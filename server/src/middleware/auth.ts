import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../types";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

interface AuthedRequest extends Request {
    user?: any;
}

export const authenticateJWT = (req: AuthedRequest, res: Response, next: NextFunction): void => {
    const accessToken = req.headers['authorization'] as string;
    const refreshToken = req.cookies['refreshToken'];

    if (!accessToken || !refreshToken) {
         res.status(401).send('Access Denied. No token provided.');
         return
    }

    const splittedAccess = accessToken.split('Bearer ')?.[1] as string

    try {
        const decoded = jwt.verify(splittedAccess, JWT_SECRET) as {user?: User};
        req.user = decoded.user;
        next();
    } catch (error) {
        if (!refreshToken) {
             res.status(401).send('Access Denied. No refresh token provided.');
             return;
        }
        try {
            const decoded = jwt.verify(refreshToken, JWT_SECRET) as {user?: User};
            const accessToken = jwt.sign({ user: decoded.user }, JWT_SECRET, { expiresIn: '1h' });

            res
                .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
                .header('Authorization', accessToken)
                .send(decoded.user);
        } catch (error) {
             res.status(400).send('Invalid Token.');
             return;
        }
    }
};
