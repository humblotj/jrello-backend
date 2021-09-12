import { Router } from 'express';

import { updateCard, deleteCard, createCard, archiveAllCards, moveAllCards, sortCards } from '../controllers/card';

const router = Router();

router.post('/', createCard);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);
router.post('/archiveAll', archiveAllCards);
router.post('/moveAll', moveAllCards);
router.post('/sort', sortCards);

export default router;
