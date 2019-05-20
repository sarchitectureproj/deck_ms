import MongoClient from 'mongodb';

export async function connect() {
    try {
        // const client = await MongoClient.connect('mongodb://db:27017', {
        // const client = await MongoClient.connect('mongodb://localhost:27020', {
        const client = await MongoClient.connect('mongodb://db:27020', {
            useNewUrlParser: true,
            poolSize: 10,
        });
        const database = client.db('node-restapi')
        console.log('db is connected')
        return database;
    } catch (error) {
        console.log(error)
    }
}


