import { Request, Response } from "express";
import {
    createVideoForUser,
    deleteVideoFromUser,
    getVideoById,
    getVideosByUserId,
    updateVideoForUser
} from "../models/videos";

export const getVideos = async (req: Request, res: Response) => {
    const { userId } = req.query

    if (!userId) {
        res.status(400).json({error: 'Cannot find user'})
        return
    }

    try {
        const videos = await getVideosByUserId(Number(userId));
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching videos' });
    }
};

export const getVideo = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
        res.status(400).json({error: 'Cannot find video'})
        return
    }

    try {
        const video = await getVideoById(Number(id));
        if (!video) {
            res.status(404).json({ error: 'Video not found' });
            return;
        }
        res.json(video);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching video' });
    }
};

export const createVideo = async (req: Request, res: Response) => {
    const { title, url, description, userId } = req.body;

    if (!userId) {
        res.status(400).json({error: 'User is required!'})
        return
    }

    if (!title || !url || !description) {
        res.status(400).json({error: 'Fill all fields!'})
        return
    }

    try {
        await createVideoForUser(title, description, userId, url);

        res.status(201).json({ message: "Video created successfully!" });
    } catch (error) {
        res.status(500).json({ error: 'Error creating video' });
    }
};

export const updateVideo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, url, description } = req.body;

    if (!id) {
        res.status(404).json({ error: 'Video not found' });
        return;
    }

    try {
        await updateVideoForUser(Number(id), title, description, url);
        res.json({ message: 'Video updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating video' });
    }
};

export const deleteVideo = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        res.status(404).json({ error: 'Video not found' });
        return;
    }
    try {
        await deleteVideoFromUser(Number(id));
        res.json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting video' });
    }
};