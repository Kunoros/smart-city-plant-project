import {
    createPlantPot,
    deletePlantPot,
    getAllPlantPots,
    getPlantPot,
    updatePlantPot,
} from '../services/plantPots.service.js';

class PlantPotController {

    async getAll(req, res, next) {
        console.log('[CTRL] getAll → START');

        try {
            const plantPots = await getAllPlantPots();
            return res.json(plantPots);

        } catch (err) {
            console.error('[CTRL] getAll → ERROR:', err);
            next(err);
        }
    }

    async getById(req, res, next) {
        console.log('[CTRL] getById → START', req.params);

        try {
            const plantPot = await getPlantPot(req.params.id);

            if (!plantPot) {
                return res.status(404).json({ message: 'Not found' });
            }

            return res.json(plantPot);

        } catch (err) {
            console.error('[CTRL] getById → ERROR:', err);
            next(err);
        }
    }

    async create(req, res, next) {
        console.log('[CTRL] create → START', req.body);

        try {
            const plantPot = await createPlantPot(req.body);
            return res.status(201).json(plantPot);

        } catch (err) {
            console.error('[CTRL] create → ERROR:', err);
            next(err);
        }
    }

    async update(req, res, next) {
        console.log('[CTRL] update → START', { params: req.params, body: req.body });

        try {
            const updated = await updatePlantPot(req.params.id, req.body);

            if (!updated) {
                return res.status(404).json({ message: 'Not found' });
            }

            return res.json(updated);

        } catch (err) {
            console.error('[CTRL] update → ERROR:', err);
            next(err);
        }
    }

    async remove(req, res, next) {
        console.log('[CTRL] delete → START', req.params);

        try {
            const deleted = await deletePlantPot(req.params.id);

            if (!deleted) {
                return res.status(404).json({ message: 'Not found' });
            }

            return res.status(204).send();

        } catch (err) {
            console.error('[CTRL] delete → ERROR:', err);
            next(err);
        }
    }
}

export default new PlantPotController();