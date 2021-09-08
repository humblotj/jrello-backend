import { Router } from 'express';

import { updateCard, deleteCard, createCard } from '../controllers/card';

const router = Router();

router.post('/', createCard);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);

export default router;
