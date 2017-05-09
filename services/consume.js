import {connection as rabbitConnection} from '../app';
import * as config from '../configs/configs';

function createChannel() {
    return new Promise((resolve, reject) => {
        rabbitConnection.createChannel((err, ch) => {
            if (err) {console.log("create channel err %s", err); reject(err)}
            else resolve(ch);
        });
    });
}

export function consume() {
    return new Promise(async (resolve, reject) => {
        try {
            let channel = await createChannel();
            channel.assertExchange(config.exchangeName.default, 'topic', {durable: true});
            channel.prefetch(1);
            channel.assertQueue(config.queueName.default, {exclusive: false}, (err, q) => {
                if (err) {console.log("error : %s", err); reject(err);}
                else {
                    channel.bindQueue(q.queue, config.exchangeName.default, config.queueTo.default);
                    resolve({channel: channel, queue: q.queue});
                }
            });
        }catch (err){
            reject(err);
        }
    });
}