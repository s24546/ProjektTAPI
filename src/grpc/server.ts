const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const swordService = require('./services/swordService');
const oilService = require('./services/oilService');
const decoctionService = require('./services/decoctionService');

const packageDefinition = protoLoader.loadSync('src/grpc/proto/witcher.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const witcherProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(witcherProto.witcherAPI.SwordService.service, swordService);
server.addService(witcherProto.witcherAPI.OilService.service, oilService);
server.addService(witcherProto.witcherAPI.DecoctionService.service, decoctionService);

server.bindAsync(
    '127.0.0.1:9191',
    grpc.ServerCredentials.createInsecure(),
    (err: Error | null, port: number) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`gRPC server started on port ${port}`);
        }
    }
);