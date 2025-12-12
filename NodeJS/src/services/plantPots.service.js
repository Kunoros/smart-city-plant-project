import * as repo from '../repository/PlantPots.repository.js';

export const getAllPlantPots = () => repo.findAllPlantPots();
export const getPlantPot = (id) => repo.findPlantPotById(id);
export const createPlantPot = (payload) => repo.createPlantPot(payload);
export const updatePlantPot = (id, payload) => repo.updatePlantPot(id, payload);
export const deletePlantPot = (id) => repo.deletePlantPot(id);