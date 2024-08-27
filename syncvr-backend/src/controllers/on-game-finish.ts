
import { Request, Response } from 'express';
import { connectToDatabase } from '../lib/database';

interface Synchronization {
    value: number;
    time: number;
}

interface OnGameFinishBody {
    email: string;
    uniqueId: string;
    answers: number[];
    synchronizationHands: Synchronization[]
    synchronizationPendulum: Synchronization[]
}

// Calculates avgs of sync levels, updates experience data at the end of the experience. 
export async function onGameFinish(req: Request, res: Response) {
    const { uniqueId, answers, synchronizationHands, synchronizationPendulum, email } = req.body as OnGameFinishBody;

    console.log(req.body)
    if (!uniqueId || !answers || !synchronizationHands || !synchronizationPendulum || !email) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const { db } = await connectToDatabase();
        const result = await db.collection('feedback').insertOne({
            uniqueId,
            email,
            answers,
            synchronizationHands,
            synchronizationPendulum
        });
        await db.collection('scheduled').updateOne({uniqueId}, {
            $set: {
                done: true,
                // Reduce caulcualtes the avg
                avgSyncHands: synchronizationHands? synchronizationHands.reduce((acc, curr) => acc + curr.value, 0) / synchronizationHands.length: 0,
                avgSyncPendulum: synchronizationPendulum? synchronizationPendulum.reduce((acc, curr) => acc + curr.value, 0) / synchronizationPendulum.length: 0,
            }
        }
        );
        return res.status(201).json(result);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}