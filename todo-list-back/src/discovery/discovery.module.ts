import Eureka from 'eureka-js-client';

export default new Eureka({
    instance: {
        app: 'todo-application',
        hostName: 'localhost',
        ipAddr: 'localhost',
        statusPageUrl: 'http://localhost:3000/api',
        port: {
            '$': 3000,
            '@enabled': 'true',
        },
        vipAddress: 'jq.test.something.com',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
    },
    eureka: {
        host: process.env.EUREKA_SERVICE_URL,
        port: 8761,
        servicePath: '/eureka/apps/',
    }
});