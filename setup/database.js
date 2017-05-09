import {config} from '../configs/configs';
import {MongoClient} from 'mongodb';

export function mongoConnect() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(config.mongo_uri, (err, database) => {
            if(err) {console.log("\nConnected to mongodb server failed"); reject(err);}
            else {console.log("\nConnected to mongodb server"); resolve(database);}
        });
    });
}

