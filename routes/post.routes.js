import Router from 'express'
import Postcontroller from '../controllers/post.controller.js';

const router = Router();

router.get('/',Postcontroller.get)
router.get('/:id',Postcontroller.getById)
router.post('/',Postcontroller.post)
router.put('/:id',Postcontroller.put)
router.delete('/:id',Postcontroller.delete);
export default router 