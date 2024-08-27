import { Router } from 'express';
import { onGameFinish } from '../controllers/on-game-finish';

const onGameFinishRouter: Router = Router();

onGameFinishRouter.put('/on-game-finish', onGameFinish);

export { onGameFinishRouter };