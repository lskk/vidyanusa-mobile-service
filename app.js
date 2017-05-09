import {mongoConnect} from './setup/database';
import {brokerConnect} from './setup/broker'
import * as os from 'os';
const cluster = require('cluster');

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


if (cluster.isMaster) {
    let cpuCount = os.cpus().length;
    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log('\nWorker %d died :(', worker.id);
        cluster.fork();
    });

}else {
    connect();
    console.log('\nWorker %d running!', cluster.worker.id);
}