import express from 'express';
import machinesRoutes from './routes/machines.routes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
app.use(express.json());

app.use('/api/machines', machinesRoutes);

app.use(errorHandler);

export default app;