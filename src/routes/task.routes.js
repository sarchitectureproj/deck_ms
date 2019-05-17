import { Router } from 'express'
import { connect } from '../database'
import { ObjectID } from 'mongodb'
const router = Router();
// /tasks
const collection = 'tasks'
router.get('/', async (req, res) => {
    const db = await connect();
    const result = await db.collection(collection).find({}).toArray();
    res.json(result);
})

router.post('/', async (req, res) => {
    const db = await connect();
    const { title, description } = req.body;
    const task = {
        title: title,
        description: description,
    }
    const result = await db.collection(collection).insert(task);
    res.send(result);
})
router.put('/:id', async (req, res) => {
    const db = await connect();
    const id = req.params
    const { title, description } = req.body;
    const task = {
        title: title,
        description: description,
    }
    const result = await db.collection(collection).insert(task);
    res.send(result);
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection(collection).findOne({ _id: ObjectID(id) });
    res.json(result)
})

router.delete('/:id', async (req, res) => {
    const { id } = await req.params;
    const db = await connect();
    const result = await db.collection(collection).remove({ _id: ObjectID(id) })
    res.json({
        message: `The object ${id} was deleted`,
        result: result
    })
});


export default router;