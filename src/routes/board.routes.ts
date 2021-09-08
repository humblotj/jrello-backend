import { Router } from 'express';

import { getBoard } from '../controllers/board';

const router = Router();

router.post('/', getBoard);

export default router;
