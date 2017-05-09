import {connect} from './setup/database';

async function connectToDb() {
    try{
        let database = await connect();
    }catch (err){
        console.log(err);
    }
}

connectToDb();