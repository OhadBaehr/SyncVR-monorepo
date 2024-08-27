
import { Request, Response } from 'express';
import { connectToDatabase } from '../lib/database';

// Get the scheduled experience configuration
export async function onGameStart(req: Request, res: Response) {
    const { sessionId } = req.query;
    if (!sessionId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const { db } = await connectToDatabase();
        const scheduled = await db.collection('scheduled').findOne({ sessionId, done: false })
        return res.json(scheduled);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}