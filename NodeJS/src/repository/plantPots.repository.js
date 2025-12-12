import { pool } from '../config/db.js';

export const findAllPlantPots = async () => {
    console.log('[DB] findAllPlantPots → START');

    try {
        const query = 'SELECT * FROM plant_pots ORDER BY created_at DESC';
        console.log('[DB] QUERY:', query);

        const { rows } = await pool.query(query);
        console.log(`[DB] findAllPlantPots → RESULT: ${rows.length} rows`);
        return rows;

    } catch (err) {
        console.error('[DB] findAllPlantPots → ERROR:', err);
        throw err;
    }
};

export const findPlantPotById = async (id) => {
    console.log('[DB] findPlantPotById → START:', id);

    try {
        const query = 'SELECT * FROM plant_pots WHERE id = $1';
        console.log('[DB] QUERY:', query, 'PARAMS:', [id]);

        const { rows } = await pool.query(query, [id]);
        console.log('[DB] findPlantPotById → RESULT:', rows[0]);
        return rows[0];

    } catch (err) {
        console.error('[DB] findPlantPotById → ERROR:', err);
        throw err;
    }
};

export const createPlantPot = async ({
                                         machine_id,
                                         name,
                                         plant_species,
                                         optimal_moisture_min,
                                         optimal_moisture_max
                                     }) => {
    console.log('[DB] createPlantPot → START:', {
        machine_id, name, plant_species, optimal_moisture_min, optimal_moisture_max
    });

    try {
        const query = `
            INSERT INTO plant_pots (
                machine_id,
                name,
                plant_species,
                optimal_moisture_min,
                optimal_moisture_max
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`;

        const params = [
            machine_id,
            name,
            plant_species || null,
            optimal_moisture_min || null,
            optimal_moisture_max || null
        ];

        console.log('[DB] QUERY:', query, 'PARAMS:', params);

        const { rows } = await pool.query(query, params);
        console.log('[DB] createPlantPot → RESULT:', rows[0]);
        return rows[0];

    } catch (err) {
        console.error('[DB] createPlantPot → ERROR:', err);
        throw err;
    }
};

export const updatePlantPot = async (id, {
    machine_id,
    name,
    plant_species,
    optimal_moisture_min,
    optimal_moisture_max
} = {}) => {

    console.log('[DB] updatePlantPot → START:', {
        id, machine_id, name, plant_species, optimal_moisture_min, optimal_moisture_max
    });

    try {
        const query = `
            UPDATE plant_pots
            SET machine_id = COALESCE($1, machine_id),
                name = COALESCE($2, name),
                plant_species = COALESCE($3, plant_species),
                optimal_moisture_min = COALESCE($4, optimal_moisture_min),
                optimal_moisture_max = COALESCE($5, optimal_moisture_max),
                updated_at = NOW()
            WHERE id = $6
            RETURNING *`;

        const params = [
            machine_id,
            name,
            plant_species,
            optimal_moisture_min,
            optimal_moisture_max,
            id
        ];

        console.log('[DB] QUERY:', query, 'PARAMS:', params);

        const { rows } = await pool.query(query, params);
        console.log('[DB] updatePlantPot → RESULT:', rows[0]);
        return rows[0];

    } catch (err) {
        console.error('[DB] updatePlantPot → ERROR:', err);
        throw err;
    }
};

export const deletePlantPot = async (id) => {
    console.log('[DB] deletePlantPot → START:', id);

    try {
        const query = 'DELETE FROM plant_pots WHERE id = $1 RETURNING *';
        console.log('[DB] QUERY:', query, 'PARAMS:', [id]);

        const { rows } = await pool.query(query, [id]);
        console.log('[DB] deletePlantPot → RESULT:', rows[0]);
        return rows[0];

    } catch (err) {
        console.error('[DB] deletePlantPot → ERROR:', err);
        throw err;
    }
};