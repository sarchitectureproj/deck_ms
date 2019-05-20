import { Router } from 'express'

const router = Router();

router.get('/', (req, res) => {
    res.json('Deck microservice')
})
router.get('/delete_all', async (req, res) => {
    const db = req.app.locals.database;
    const result = await db.collection("decks").remove({})
    await db.collection("cabins").remove({})
    await db.collection("meeting_points").remove({})
    res.json(result)
})

export default router; 