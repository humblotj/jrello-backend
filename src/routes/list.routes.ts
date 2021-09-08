import { Router } from 'express';

import { updateList, deleteList } from '../controllers/list';

const router = Router();

router.post('/update', updateList);
router.post('/delete', deleteList);

export default router;
