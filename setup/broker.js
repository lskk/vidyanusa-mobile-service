import {connect} from 'amqplib';
import {config} from '../configs/configs';

export function connect() {
    return new Promise((resolve, reject) => {
        connect(config.broker_uri, (err, connection) => {
            if(err)reject(err);
            else resolve(connection);
        })
    });
}