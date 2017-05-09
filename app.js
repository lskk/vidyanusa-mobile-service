import {mongoConnect} from './setup/database';
import {brokerConnect} from './setup/broker'
import * as os from 'os';
import {consume} from './services/consume';
const cluster = require('cluster');

async function connect() {
    try{
        let database = await mongoConnect();
        let connection = await brokerConnect();
        exports.database = database;
        exports.connection = connection;
        /** listen incoming message : **/
        try {
            let listen = await consume();
            listen.channel.consume(listen.queue, msg => {
                console.log(msg.content.toString());
                    // process data here
                }, {noAck: true});
        }catch (err){
            console.log(err);
            //TODO: reconnect or whateva
        }
    }catch (err){
        console.log(err);
    }
}


if (cluster.isMaster) {
    let cpuCount = os.cpus().length;
    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        console.log('\nWorker %d died :(', worker.id);
        cluster.fork();
    });

}else {
    connect();
    console.log('\nWorker %d running!', cluster.worker.id);
}