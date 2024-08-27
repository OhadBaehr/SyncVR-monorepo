import { Router } from 'express';
import { setAvatar, getOtherAvatar } from '../controllers/avatars';

const avatarsRouter: Router = Router();

avatarsRouter.put('/avatars', setAvatar);
avatarsRouter.get('/avatars/other', getOtherAvatar);

export { avatarsRouter };