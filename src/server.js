import express, { json } from 'express';
const app = express();

//Settings
app.set('port', process.env.PORT || 8888)

//Routes
import IndexRoutes from './routes/index.routes'
import TasksRoutes from './routes/task.routes'
import MeetingPoints from './routes/meeting_point.routes'
import MeetingSchedules from './routes/meeting_schedule.routes'
//middlewares
app.use(json());


app.use(IndexRoutes);
app.use('/tasks', TasksRoutes);
app.use('/meeting_points', MeetingPoints);
app.use('/meeting_schedules', MeetingSchedules);


export default app;