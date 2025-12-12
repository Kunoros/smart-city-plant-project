-- 1. machines Table (The ESP32 devices)
CREATE TABLE machines (
                          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                          mac_address CHAR(17) UNIQUE NOT NULL,
                          name VARCHAR(255) NOT NULL,
                          description TEXT,
                          created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. plant_pots Table (The monitored plants)
CREATE TABLE plant_pots (
                            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                            machine_id UUID NOT NULL REFERENCES machines(id) ON DELETE CASCADE,
                            name VARCHAR(255) NOT NULL,
                            plant_species VARCHAR(255),
                            optimal_moisture_min NUMERIC(5, 2),
                            optimal_moisture_max NUMERIC(5, 2),
                            created_at TIMESTAMPTZ DEFAULT NOW(),
                            updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. sensor_data Table (CONSOLIDATED READINGS)
CREATE TABLE sensor_data (
                             id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                             plant_pot_id UUID NOT NULL REFERENCES plant_pots(id) ON DELETE CASCADE,

    -- --- BME280 Readings ---
                             temperature_c NUMERIC(5, 2) NOT NULL,
                             humidity_percent NUMERIC(5, 2) NOT NULL,
                             pressure_hpa NUMERIC(10, 2) NOT NULL,

    -- --- Soil Moisture Reading ---
                             moisture_percentage NUMERIC(5, 2) NOT NULL,
                             moisture_raw_value INTEGER NOT NULL,

    -- --- Light Reading ---
                             lux_value NUMERIC(10, 2),

    -- --- Metadata ---
                             captured_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. watering_events Table (Actionable events)
CREATE TABLE watering_events (
                                 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                 plant_pot_id UUID NOT NULL REFERENCES plant_pots(id) ON DELETE CASCADE,
                                 water_amount_ml NUMERIC(10, 2) NOT NULL,
                                 watered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                                 source VARCHAR(50) DEFAULT 'automated'
);