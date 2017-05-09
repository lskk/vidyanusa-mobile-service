import {mongoConnect} from './setup/database';
import {brokerConnect} from './setup/broker'

async function connect() {
    try{
        let database = await mongoConnect();
        exports.database = database;
        let connection = await brokerConnect();
        exports.connection = connection;
    }catch (err){
        console.log(err);
    }
}

connect();