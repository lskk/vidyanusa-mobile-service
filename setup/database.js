import {mongoconfig} from '../configs/database';
import {MongoClient} from 'mongodb';

export function connect() {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(mongoconfig.mongo_uri, function(err, database) {
            if(err) {
                console.log("Connected to mongodb server failed");
                reject(err);
            }else {
                console.log("Connected to mongodb server");
                resolve(database);
            }
        });
    });
}

