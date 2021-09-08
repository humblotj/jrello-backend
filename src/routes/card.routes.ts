import { Router } from 'express';

import { updateCard, deleteCard } from '../controllers/card';

const router = Router();

router.put('/:id', updateCard);
router.delete('/:id', deleteCard);

export default router;
