export interface User {
    id?: number;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

export interface Video {
    id: number;
    title: string;
    description: string;
    userId: number;
    url: string;
}