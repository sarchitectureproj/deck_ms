import express, { Router } from 'express'
import { connect } from '../database'
import { ObjectID } from 'mongodb'
//import {db} from '../server'

const router = Router();
const collection = 'meeting_points'
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
        const { name } = req.body.meeting_point;
        const data = {
            name: name,
        }
        const result = await db.collection(collection).insert(data);
        res.send(result.ops[0]);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
})
router.put('/:id', async (req, res) => {
    try {
        const db = req.app.locals.database;
        const { id } = req.params
        const { name } = req.body.meeting_point;
        const data = {
            name: name,
        }
        const result = await db.collection(collection).updateOne({ _id: ObjectID(id) }, { $set: data });
        res.send({ id: id });
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
        res.send({
            id: id
        })
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});


export default router;