import express from 'express';
import PlantPotController from '../controllers/plantPots.controller.js';

const router = express.Router();

router.get('/', PlantPotController.getAll);
router.get('/:id', PlantPotController.getById);
router.post('/', PlantPotController.create);
router.patch('/:id', PlantPotController.update);
router.delete('/:id', PlantPotController.remove);

export default router;