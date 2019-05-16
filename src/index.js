import '@babel/polyfill'
import app from './server'

async function main() {
    let port = app.get('port');
    await app.listen(port);
    console.log('Server on port', port);
}
main();