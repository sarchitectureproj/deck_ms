import { Router } from 'express'
import { connect } from '../database'
import { ObjectID } from 'mongodb'
import {test} from '../server'
const router = Router();

const collection = 'meeting_schedules'
router.get('/', async (req, res) => {
    const db = await connect();
    try {
        const result = await db.collection(collection).find({}).toArray();
        res.json(result);
    } catch (error) {

        res.status(500).json({ error: error.toString() });
    }
})

router.post('/', async (req, res) => {
    const db = await connect();
    try {
        const { time } = req.body.meeting_schedule;
        const data = {
            time: time,
        }
        const result = await db.collection(collection).insert(data);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
})
router.put('/:id', async (req, res) => {
    const db = await connect();
    const { id } = req.params
    const { time, meeting_point_id } = req.body.meeting_schedule;
    const data = {
        time: time,
        meeting_point_id: meeting_point_id,
    }
    try {
        const result = await db.collection(collection).updateOne({ _id: ObjectID(id) }, { $set: data });
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
})


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connect();
        const result = await db.collection(collection).findOne({ _id: ObjectID(id) });
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }

})
router.delete('/:id', async (req, res) => {
    const { id } = await req.params;
    const db = await connect();
    try {
        const result = await db.collection(collection).remove({ _id: ObjectID(id) })
        res.json({
            message: `The object ${id} was deleted`,
            result: result
        })
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});


export default router;