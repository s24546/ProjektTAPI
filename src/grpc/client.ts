import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

// Załaduj proto
const packageDefinition = protoLoader.loadSync('src/grpc/proto/witcher.proto', {});
const witcherProto: any = grpc.loadPackageDefinition(packageDefinition).WitcherService;

// Stwórz klienta
const client = new witcherProto(
    'localhost:50051',
    grpc.credentials.createInsecure()
);

// Wywołaj metodę `GetItems`
client.GetItems({}, (error: any, response: any) => {
    if (error) {
        console.error("Error:", error);
        return;
    }
    console.log("Items:", response.items);
});