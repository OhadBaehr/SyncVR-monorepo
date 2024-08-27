import { Router } from 'express';
import { onGameStart } from '../controllers/on-game-start';

const onGameStartRouter: Router = Router();

onGameStartRouter.get('/on-game-start', onGameStart);

export { onGameStartRouter };