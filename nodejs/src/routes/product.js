import express from 'express';
import { create, getAll, getID, remove, update } from '../controller/products.js';

const router = express.Router();


router.get('/', getAll);

// lay san pham theo id
router.get('/:id', getID);

// them
router.post('/create', create);


router.patch('/up', update);

router.delete('/delete', remove);

export default router;