const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const protoPath = path.join(__dirname, '../protos/order.proto');
const packageDefinition = protoLoader.loadSync(protoPath, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const orderProto = grpc.loadPackageDefinition(packageDefinition).order;

const client = new orderProto.OrderService('localhost:50051', grpc.credentials.createInsecure());

// Sipariş Ekle
client.AddOrder({ id: 3, product: 'Notebook', quantity: 5 }, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('AddOrder Response:', response);
    
    // Sipariş Bilgisi Getir
    client.GetOrder({ id: 3 }, (error, response) => {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('GetOrder Response:', response);
      }
    });
  }
});
