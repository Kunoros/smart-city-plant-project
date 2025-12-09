CREATE TABLE IF NOT EXISTS users (
                                     id SERIAL PRIMARY KEY,
                                     name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
    );

CREATE TABLE IF NOT EXISTS posts (
                                     id SERIAL PRIMARY KEY,
                                     user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    content TEXT
    );