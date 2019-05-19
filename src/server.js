import express, { json } from 'express';
import {connect} from './database'
const app = express();
//Setting
app.set('port', process.env.PORT || 8888)

//connect to database
// const db = async  () => await connect();
// console.log(db) 
// app.locals.database = db;
// console.log(db) 

//Routes
import IndexRoutes from './routes/index.routes'
import TasksRoutes from './routes/task.routes'
import MeetingPoints from './routes/meeting_point.routes'
import MeetingSchedules from './routes/meeting_schedule.routes'

//middlewares
app.use(json());
//const db = async () =>{await connect()}; 


app.use(IndexRoutes);
app.use('/tasks', TasksRoutes);
app.use('/meeting_points', MeetingPoints);
app.use('/meeting_schedules', MeetingSchedules);


export  default app ;