import express, { json } from 'express';
const app = express();

//Settings
app.set('port', process.env.PORT || 8888)

//Routes
import IndexRoutes from './routes/index.routes'
import TasksRoutes from './routes/task.routes'

//middlewares
app.use(json());


app.use(IndexRoutes);
app.use('/tasks', TasksRoutes);


export default app;