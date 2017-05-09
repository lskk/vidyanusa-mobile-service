import {connect} from './setup/database';

async function connectToDb() {
    try{
        let database = await connect();
        exports.database = database;
    }catch (err){
        console.log(err);
    }
}

connectToDb();