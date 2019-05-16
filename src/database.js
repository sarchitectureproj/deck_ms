import MongoClient from 'mongodb';

export async function connect() {
    try {
        const client = await MongoClient.connect('mongodb://db:27017', {
            useNewUrlParser: true
        });
        const database = client.db('node-restapi')
        console.log('db is connected')
        return database;
    } catch (error) {
        console.log(error)
    }
}


