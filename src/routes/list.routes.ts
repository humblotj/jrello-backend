import { Router } from 'express';

import { updateList, deleteList } from '../controllers/list';

const router = Router();

router.put('/:id', updateList);
router.delete('/:id', deleteList);

export default router;
