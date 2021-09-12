import { Router } from 'express';

import { updateCard, deleteCard, createCard, archiveAllCards } from '../controllers/card';

const router = Router();

router.post('/', createCard);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);
router.post('/archiveAll', archiveAllCards);

export default router;
