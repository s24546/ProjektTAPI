const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('src/grpc/proto/witcher.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const proto = grpc.loadPackageDefinition(packageDefinition);

// Inicjalizacja klientów
const swordClient = new proto.witcherAPI.SwordService(
    'localhost:9191',
    grpc.credentials.createInsecure()
);

const oilClient = new proto.witcherAPI.OilService(
    'localhost:9191',
    grpc.credentials.createInsecure()
);

const decoctionClient = new proto.witcherAPI.DecoctionService(
    'localhost:9191',
    grpc.credentials.createInsecure()
);

// Przykłady użycia dla mieczy
const testSwords = () => {
    // Pobranie wszystkich mieczy z sortowaniem i filtrowaniem
    const swordQuery = {
        filters: [
            { field: 'material', operator: 'eq', value: 'silver' }
        ],
        sorts: [
            { field: 'name', ascending: true }
        ],
        pagination: {
            page: 1,
            pageSize: 10
        }
    };

    swordClient.ReadSwords(swordQuery, (error, response) => {
        if (error) {
            console.error('Error reading swords:', error);
            return;
        }
        console.log('Filtered swords:', response.swords);
    });

    // Pobranie pojedynczego miecza
    swordClient.ReadSword({ id: 1 }, (error, response) => {
        if (error) {
            console.error('Error reading sword:', error);
            return;
        }
        console.log('Single sword:', response);
    });

    // Utworzenie nowego miecza
    const newSword = {
        name: "Aerondight",
        description: "Legendarny srebrny miecz",
        type: "sword",
        material: "silver"
    };

    swordClient.CreateSword(newSword, (error, response) => {
        if (error) {
            console.error('Error creating sword:', error);
            return;
        }
        console.log('Created sword:', response);
    });
};

// Przykłady użycia dla olejów
const testOils = () => {
    // Pobranie olejów z filtrowaniem po składnikach
    const oilQuery = {
        filters: [
            { field: 'ingredients', operator: 'contains', value: 'mandragora' }
        ],
        sorts: [
            { field: 'charges', ascending: false }
        ],
        pagination: {
            page: 1,
            pageSize: 5
        }
    };

    oilClient.ReadOils(oilQuery, (error, response) => {
        if (error) {
            console.error('Error reading oils:', error);
            return;
        }
        console.log('Filtered oils:', response.oils);
    });

    // Utworzenie nowego oleju
    const newOil = {
        name: "Olej przeciw wampirom",
        description: "Skuteczny przeciw niższym wampirom",
        type: "oil",
        ingredients: "czosnek, jaskółcze ziele",
        charges: 3
    };

    oilClient.CreateOil(newOil, (error, response) => {
        if (error) {
            console.error('Error creating oil:', error);
            return;
        }
        console.log('Created oil:', response);
    });
};

// Przykłady użycia dla wywarów
const testDecoctions = () => {
    // Pobranie wywarów z filtrowaniem po toksyczności
    const decoctionQuery = {
        filters: [
            { field: 'toxicity', operator: 'lt', value: '50' }
        ],
        sorts: [
            { field: 'toxicity', ascending: true }
        ],
        pagination: {
            page: 1,
            pageSize: 5
        }
    };

    decoctionClient.ReadDecoctions(decoctionQuery, (error, response) => {
        if (error) {
            console.error('Error reading decoctions:', error);
            return;
        }
        console.log('Filtered decoctions:', response.decoctions);
    });

    // Utworzenie nowego wywaru
    const newDecoction = {
        name: "Wywar z Kota",
        description: "Zwiększa zdolności akrobatyczne",
        type: "decoction",
        ingredients: "mutagen kota, łuska drakonida",
        duration: "30min",
        toxicity: 25
    };

    decoctionClient.CreateDecoction(newDecoction, (error, response) => {
        if (error) {
            console.error('Error creating decoction:', error);
            return;
        }
        console.log('Created decoction:', response);
    });
};

// Wybór operacji do wykonania
const [,, operation] = process.argv;

switch (operation) {
    case 'swords':
        testSwords();
        break;
    case 'oils':
        testOils();
        break;
    case 'decoctions':
        testDecoctions();
        break;
    default:
        console.log('Please specify operation: swords, oils, or decoctions');
        break;
}