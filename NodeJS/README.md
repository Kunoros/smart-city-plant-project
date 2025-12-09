# Prerequisites

* Docker
* Docker Compose
* Node.js (for local development, optional)
* PostgreSQL client or GUI (e.g., pgAdmin, JetBrains DataGrip)

# Installation

Install project dependencies:

```
npm install
```

# Running with Docker Compose

Build and start all services:

```
docker-compose up --build
```

The API is available at:

[http://localhost:3000](http://localhost:3000)

The PostgreSQL database is accessible on port **5432**.

# Database Setup

The project includes a script to create the database and two basic tables automatically if they do not exist. To run it, use:

```
npm run setup-db
```

This will:

* Start the project
* Connect to the PostgreSQL database
* Create the required tables if they are not already present

# Connecting to the Database

You can connect to the PostgreSQL database using any database interface such as pgAdmin or JetBrains DataGrip. Make sure to use the following credentials (or your custom ones from `docker-compose.yml`):

* Host: `localhost`
* Port: `5432`
* Username: as defined in `docker-compose.yml`
* Password: as defined in `docker-compose.yml`
* Database: as defined in `docker-compose.yml`

**Note:** If using JetBrains DataGrip, ensure the PostgreSQL driver is installed (version 42.7.3 recommended) to avoid connection errors.
