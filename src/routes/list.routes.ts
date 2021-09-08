import { Router } from 'express';

import { updateList, deleteList, createList } from '../controllers/list';

const router = Router();

router.put('/', createList);
router.put('/:id', updateList);
router.delete('/:id', deleteList);

export default router;
