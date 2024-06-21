const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const protoPath = path.join(__dirname, '../protos/user.proto');
const packageDefinition = protoLoader.loadSync(protoPath, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const client = new userProto.UserService('localhost:50051', grpc.credentials.createInsecure());

// Kullanıcı Ekle
client.AddUser({ id: 3, name: 'Charlie' }, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('AddUser Response:', response);
    
    // Kullanıcı Bilgisi Getir
    client.GetUser({ id: 3 }, (error, response) => {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('GetUser Response:', response);
      }
    });
  }
});
