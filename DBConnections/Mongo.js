const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://ids-dev-user:WMpdJmC90Jr67AAp@neutrinosdev-mumbai-dxwnl.mongodb.net/';
let client;

async function main() {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('Connected to DB!')
    }
    catch(e){
        console.log(e)
    }
    finally {
        // await client.close();
    }
}
main().catch(console.error);

module.exports = { client };