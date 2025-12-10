import * as repo from '../repository/machines.repository.js';

export const getAllMachines = () => repo.findAllMachines();
export const getMachine = (id) => repo.findMachineById(id);
export const createMachine = (payload) => repo.createMachine(payload);
export const updateMachine = (id, payload) => repo.updateMachine(id, payload);
export const deleteMachine = (id) => repo.deleteMachine(id);