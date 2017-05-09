import {router} from '../configs/configs';


export function checkState(type, msg) {
    console.log('--------------------------------------------');
    console.log(type +" : "+msg);
    console.log('--------------------------------------------');
    return new Promise(async (resolve, reject) => {
        switch (type){
            case router.user_login:

                break;
        }
    });
}