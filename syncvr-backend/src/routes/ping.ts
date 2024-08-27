import { Router } from 'express';
import { ping } from '../controllers/ping';

const pingRouter: Router = Router();

pingRouter.get('/ping', ping);

export { pingRouter };