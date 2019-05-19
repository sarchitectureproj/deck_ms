import '@babel/polyfill'
import app from './server'
import {connect} from './database'


async function main() {
    let port = app.get('port');
    //connect to database
    const db = await connect();
    app.locals.database = db
    
    await app.listen(port);
    console.log('Server on port', port);
}
main();