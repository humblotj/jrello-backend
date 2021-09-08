import { Router } from 'express';

import { updateCard, deleteCard } from '../controllers/card';

const router = Router();

router.post('/update', updateCard);
router.post('/delete', deleteCard);

export default router;
