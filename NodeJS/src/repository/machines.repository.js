// data/machines.repository.js
import { pool } from '../config/db.js';

export const findAllMachines = async () => {
    const { rows } = await pool.query('SELECT * FROM machines ORDER BY id ASC');
    return rows;
};

export const findMachineById = async (id) => {
    const { rows } = await pool.query('SELECT * FROM machines WHERE id = $1', [id]);
    return rows[0];
};

export const createMachine = async ({ name, description }) => {
    const q = 'INSERT INTO machines (name, description) VALUES ($1, $2) RETURNING *';
    const { rows } = await pool.query(q, [name, description]);
    return rows[0];
};

export const updateMachine = async (id, { name, description }) => {
    const q = 'UPDATE machines SET name = $1, description = $2 WHERE id = $3 RETURNING *';
    const { rows } = await pool.query(q, [name, description, id]);
    return rows[0];
};

export const deleteMachine = async (id) => {
    const { rows } = await pool.query('DELETE FROM machines WHERE id = $1 RETURNING *', [id]);
    return rows[0];
};
