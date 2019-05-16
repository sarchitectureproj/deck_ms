import { Router } from 'express'
import { connect } from '../database'
import { ObjectID } from 'mongodb'
const router = Router();
// /tasks
router.get('/', async (req, res) => {
    const db = await connect();
    const result = await db.collection('tasks').find({}).toArray();
    res.json(result);
})

router.post('/', async (req, res) => {
    const db = await connect();
    const { title, description } = req.body;
    const task = {
        title: title,
        description: description,
    }
    const result = await db.collection('tasks').insert(task);
    res.send(result);
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('tasks').findOne({ _id: ObjectID(id) });
    res.json(result)
})

router.delete('/:id', async (req, res) => {
    const { id } = await req.params;
    const db = await connect();
    const result = await db.collection('tasks').remove({ _id: ObjectID(id) })
    res.json({
        message: `The object ${id} was deleted`,
        result: result
    })
});


export default router;