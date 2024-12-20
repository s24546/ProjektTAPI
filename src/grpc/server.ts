import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import {Sword} from "./types/Sword";

const packageDefinition = protoLoader.loadSync('src/grpc/proto/witcher.proto', {});
const witcherProto = grpc.loadPackageDefinition(packageDefinition) as any;

if (witcherProto && witcherProto.WitcherService) {
    const server = new grpc.Server();

    server.addService(witcherProto.WitcherService.service, {
        GetItems: (_: any, callback: any) => {
            callback(null, { items: [{ id: '1', name: 'Addan Deith', type: 'sword', material: 'silver', description: 'Can be found on the remains of Mourntart during Contract: The Merry Widow, or purchased from the Scoia\'tael merchant in Oxenfurt forest, after he is rescued.' }] });
        },
    });

    server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), () => {
        console.log('gRPC server running on http://localhost:50051');

    });
} else {
    console.error("WitcherService not found in loaded proto definition.");
}