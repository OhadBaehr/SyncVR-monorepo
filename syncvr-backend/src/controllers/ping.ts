import { Request, Response } from 'express';

// Used for debugging
export function ping(req: Request, res: Response) {
    return res.status(200).json({ message: 'pong' });
}