import Eureka from 'eureka-js-client';

export default new Eureka({
    instance: {
        app: 'todo-application',
        hostName: `${process.env.MY_HOST || 'localhost'}`,
        ipAddr: `${process.env.MY_HOST || 'localhost'}`,
        statusPageUrl: `http://${process.env.MY_HOST}:3000/api`,
        port: {
            '$': 3000,
            '@enabled': 'true',
        },
        vipAddress: 'todo-application',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
        registerWithEureka: true,
        fetchRegistry: true,
    },
    eureka: {
        host: `${process.env.EUREKA_SERVICE_URL || 'localhost'}`,
        port: 8761,
        servicePath: '/eureka/apps/',
    }
});