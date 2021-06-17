var redis = require("redis");

client = redis.createClient('//redis-17770.c250.eu-central-1-1.ec2.cloud.redislabs.com:17770', { password: 'HBJnDG17i51Po6TbVWzpWbEIoFK2Wkys' });

module.exports = {
    AddBlackList: (username, jwt) => {
        // client = redis.createClient();
        // client.get(username, (err, result) => {
        //     if (result == null) {
        //         client.set(username, jwt);
        //     } else {
        //         client.set(username, result + "|" + jwt);
        //     }
        //     client.get(username, async (err, result) => {
        //         console.log(result.split("|"));
        //     });
        // });
    },
    GetAll: async (username) => {
        // return await client.get(username, async (err, result) => {
        //     return await result.split("|");
        // });
    },
    CheckBlackList: async (username, jwt) => {
        // return new Promise(function (resolve, reject) {
        //     client.get(username, (err, result) => {
        //         if (result == null)
        //         {
        //             return resolve(true);
        //         }
        //         let res = result.split("|");
        //         console.log(res.indexOf(jwt));
        //         if (res.indexOf(jwt) === -1) {
        //             return resolve(true);
        //         } else {
        //             return resolve(false);
        //         }
        //     });
        // });
    },
};
