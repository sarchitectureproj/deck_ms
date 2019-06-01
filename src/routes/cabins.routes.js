import { Router } from 'express'
import { connect } from '../database'
import { ObjectID } from 'mongodb'
const router = Router();
const collection = 'cabins'
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function getRandomClass() {
    const choose = Math.floor(Math.random() * (3));
    const categories = ["Premiun business", "Premiun economy", "Economy"];
    return categories[choose]
}
function getPosition(floor, number) {
    let str = ''//floor.toString();
    let strn = number.toString();
    for (let j = 0; j < 3; j++) {
        if (j < strn.length)
            str += strn[j]
        else
            str = '0' + str
    }
    return floor.toString() + str
}
router.get('/', async (req, res) => {
    const db = req.app.locals.database;
    try {
        const result = await db.collection(collection).find({}).toArray();
        res.json(result);
    } catch (error) {

        res.status(500).json({ error: error.toString() });
    }
})
router.get('/busy', async (req, res) => {
    const db = req.app.locals.database;
    const query = { "passangers": { $gte: "1" } }
    try {
        const result = await db.collection(collection).find(query).toArray();
        res.json(result);
    } catch (error) {

        res.status(500).json({ error: error.toString() });
    }
})
router.get('/seed', async (req, res) => {
    const db = req.app.locals.database;
    const query = { "passangers": { $gte: "1" } }
    let data;
    try {
        for (let i = 0; i < 10; i++) {
            //create deck
            data = {
                floor: (i + 1),
                meeting_schedule: null,
                meeting_point_id: null,
            }
            const db = req.app.locals.database;
            const result = await db.collection('decks').insert(data);
            console.log(result)
            const id = result.ops[0]._id
            for (let j = 0; j < 100; j++) {
                data = {
                    capacity: getRandomArbitrary(1, 5),
                    category: getRandomClass(),
                    deck_id: ObjectID(id),
                    position: getPosition(i + 1, j + 1),
                }
                const rs = await db.collection(collection).insert(data);
            }
        }
        const result = await db.collection(collection).find({}).toArray();
        res.json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.toString() });
    }
})


router.post('/', async (req, res) => {
    const db = req.app.locals.database;
    try {
        const { capacity, deck_id, category, position } = req.body.cabin;
        const data = {
            capacity: capacity,
            category: category,
            passangers: 0,
            deck_id: ObjectID(deck_id),
            position: position,
        }
        const result = await db.collection(collection).insert(data);
        res.send(result.ops[0]);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
})
router.put('/:id', async (req, res) => {
    const db = req.app.locals.database;
    const { id } = req.params
    const { capacity, deck_id, category, passangers } = req.body.cabin;
    const data = {
        capacity: capacity,
        category: category,
        deck_id: ObjectID(deck_id),
        passangers: passangers
    }
    try {
        const result = await db.collection(collection).updateOne({ _id: ObjectID(id) }, { $set: data });
        const result2 = await db.collection(collection).findOne({ _id: ObjectID(id) });
        res.json(result2);
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
        res.send({ id: id });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});


export default router;