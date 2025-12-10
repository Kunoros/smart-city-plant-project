import express from 'express';
import MachineController from '../controllers/machines.controller.js';

const router = express.Router();

router.get('/', MachineController.getAll);
router.get('/:id', MachineController.getById);
router.post('/', MachineController.create);
router.put('/:id', MachineController.update);
router.patch('/:id', MachineController.update);
router.delete('/:id', MachineController.remove);

export default router;