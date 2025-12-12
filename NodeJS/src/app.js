import express from 'express';
import errorHandler from './middleware/errorHandler.js';
import machinesRoutes from './routes/machines.routes.js';
import plantPotsRoutes from "./routes/plantPots.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/machines', machinesRoutes);
app.use('/api/plant_pots', plantPotsRoutes)

app.use(errorHandler);

export default app;