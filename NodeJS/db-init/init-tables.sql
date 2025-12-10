CREATE TABLE machines (
                          id SERIAL PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          description TEXT,
                          created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE plant_pots (
                            id SERIAL PRIMARY KEY,
                            machine_id INTEGER NOT NULL REFERENCES machines(id) ON DELETE CASCADE,
                            name VARCHAR(255),
                            created_at TIMESTAMPTZ DEFAULT NOW(),
                            updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE light_sensor_readings (
                                       id SERIAL PRIMARY KEY,
                                       plant_pot_id INTEGER NOT NULL REFERENCES plant_pots(id) ON DELETE CASCADE,
                                       lux_value NUMERIC(10, 2) NOT NULL,
                                       captured_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE soil_moisture_readings (
                                        id SERIAL PRIMARY KEY,
                                        plant_pot_id INTEGER NOT NULL REFERENCES plant_pots(id) ON DELETE CASCADE,
                                        moisture_percentage NUMERIC(5, 2) NOT NULL,
                                        captured_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE temperature_readings (
                                      id SERIAL PRIMARY KEY,
                                      plant_pot_id INTEGER NOT NULL REFERENCES plant_pots(id) ON DELETE CASCADE,
                                      celsius NUMERIC(5, 2) NOT NULL,
                                      captured_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE watering_events (
                                 id SERIAL PRIMARY KEY,
                                 plant_pot_id INTEGER NOT NULL REFERENCES plant_pots(id) ON DELETE CASCADE,
                                 water_amount_ml NUMERIC(10, 2) NOT NULL,
                                 watered_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);