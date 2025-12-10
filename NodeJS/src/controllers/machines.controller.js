import {
    createMachine, deleteMachine,
    getAllMachines,
    getMachine,
    updateMachine,
} from '../services/machines.service.js';

class MachineController {
    async getAll(req, res, next) {
        try {
            const machines = await getAllMachines();
            res.json(machines);
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const machine = await getMachine(req.params.id);
            if (!machine) return res.status(404).json({ message: 'Not found' });
            res.json(machine);
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const machine = await createMachine(req.body);
            res.status(201).json(machine);
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const updated = await deleteMachine(req.params.id, req.body);
            if (!updated) return res.status(404).json({ message: 'Not found' });
            res.json(updated);
        } catch (err) {
            next(err);
        }
    }

    async remove(req, res, next) {
        try {
            const deleted = await updateMachine(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Not found' });
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}

export default new MachineController();
