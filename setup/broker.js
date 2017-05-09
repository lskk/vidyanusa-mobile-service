import {connect} from 'amqplib/callback_api';
import {config} from '../configs/configs';

export function brokerConnect() {
    return new Promise((resolve, reject) => {
        connect(config.broker_uri, (err, connection) => {
            if(err){reject(err); console.log("\nconnection failed to rabbitMQ : "+err)}
            else {resolve(connection); console.log("\nconnected to rabbit mq")}
        })
    });
}