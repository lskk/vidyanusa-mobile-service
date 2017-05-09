import {mongoConnect} from './setup/database';
import {brokerConnect} from './setup/broker'
import * as os from 'os';
import {consume} from './setup/consume';
import {checkState} from './setup/populate_messages';
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

            listen.channel.consume(listen.queue, async msg => {
                console.log(msg.content.toString());
                // process data here
                let response = await checkState();
                listen.channel.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(response)), {
                    correlationId: msg.properties.correlationId,
                    type: msg.properties.type
                });

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