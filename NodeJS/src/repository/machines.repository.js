// data/machines.repository.js
import { pool } from '../config/db.js';

export const findAllMachines = async () => {
    console.log('[DB] findAllMachines → START');

    try {
        const query = 'SELECT * FROM machines ORDER BY id ASC';
        console.log('[DB] QUERY:', query);

        const { rows } = await pool.query(query);
        console.log(`[DB] findAllMachines → RESULT: ${rows.length} rows`);
        return rows;

    } catch (err) {
        console.error('[DB] findAllMachines → ERROR:', err);
        throw err;
    }
};

export const findMachineById = async (id) => {
    console.log('[DB] findMachineById → START:', id);

    try {
        const query = 'SELECT * FROM machines WHERE id = $1';
        console.log('[DB] QUERY:', query, 'PARAMS:', [id]);

        const { rows } = await pool.query(query, [id]);
        console.log('[DB] findMachineById → RESULT:', rows[0]);
        return rows[0];

    } catch (err) {
        console.error('[DB] findMachineById → ERROR:', err);
        throw err;
    }
};

export const createMachine = async ({ mac_address, name, description }) => {
    console.log('[DB] createMachine → START:', { mac_address, name, description });

    try {
        const query = `
            INSERT INTO machines (mac_address, name, description)
            VALUES ($1, $2, $3)
            RETURNING *`;

        const params = [mac_address, name, description];
        console.log('[DB] QUERY:', query, 'PARAMS:', params);

        const { rows } = await pool.query(query, params);
        console.log('[DB] createMachine → RESULT:', rows[0]);
        return rows[0];

    } catch (err) {
        console.error('[DB] createMachine → ERROR:', err);
        throw err;
    }
};

export const updateMachine = async (id, name, description) => {
    console.log('[DB] updateMachine → START:', { id, name, description });

    try {
        const query = `
            UPDATE machines
            SET name = $1,
                description = $2
            WHERE id = $3
            RETURNING *`;

        const params = [name, description, id];
        console.log('[DB] QUERY:', query, 'PARAMS:', params);

        const { rows } = await pool.query(query, params);
        console.log('[DB] updateMachine → RESULT:', rows[0]);
        return rows[0];

    } catch (err) {
        console.error('[DB] updateMachine → ERROR:', err);
        throw err;
    }
};

export const deleteMachine = async (id) => {
    console.log('[DB] deleteMachine → START:', id);

    try {
        const query = 'DELETE FROM machines WHERE id = $1 RETURNING *';
        console.log('[DB] QUERY:', query, 'PARAMS:', [id]);

        const { rows } = await pool.query(query, [id]);
        console.log('[DB] deleteMachine → RESULT:', rows[0]);
        return rows[0];

    } catch (err) {
        console.error('[DB] deleteMachine → ERROR:', err);
        throw err;
    }
};
