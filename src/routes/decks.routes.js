import { Router } from 'express'
import { connect } from '../database'
import { ObjectID } from 'mongodb'
const router = Router();
const collection = 'decks'
router.get('/', async (req, res) => {
    const db = req.app.locals.database;
    try {
        const result = await db.collection(collection).find({}).toArray();
        res.json(result);
    } catch (error) {

        res.status(500).json({ error: error.toString() });
    }
})

router.post('/', async (req, res) => {
    const db = req.app.locals.database;
    try {
        const { floor, meeting_point_id, meeting_schedule } = req.body.deck;
        const data = {
            floor: floor,
            meeting_schedule: meeting_schedule,
            meeting_point_id: ObjectID(meeting_point_id)
        }
        const result = await db.collection(collection).insert(data);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
})
router.put('/:id', async (req, res) => {
    const db = req.app.locals.database;
    const { id } = req.params
    const { floor, meeting_point_id, meeting_schedule } = req.body.deck;
    const data = {
        floor: floor,
        meeting_schedule: meeting_schedule,
        meeting_point_id: ObjectID(meeting_point_id)
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
        const db = req.app.locals.database;
        const result = await db.collection(collection).findOne({ _id: ObjectID(id) });
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }

})
router.delete('/:id', async (req, res) => {
    const { id } = await req.params;
    const db = req.app.locals.database;
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