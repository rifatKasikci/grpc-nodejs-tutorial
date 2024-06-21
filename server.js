const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const userService = require('./services/usersService');
const orderService = require('./services/ordersService');

const userProtoPath = path.join(__dirname, 'protos', 'user.proto');
const orderProtoPath = path.join(__dirname, 'protos', 'order.proto');

const userPackageDefinition = protoLoader.loadSync(userProtoPath, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const orderPackageDefinition = protoLoader.loadSync(orderProtoPath, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });

const userProto = grpc.loadPackageDefinition(userPackageDefinition).user;
const orderProto = grpc.loadPackageDefinition(orderPackageDefinition).order;

const server = new grpc.Server();

server.addService(userProto.UserService.service, userService);
server.addService(orderProto.OrderService.service, orderService);

const PORT = 50051;
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
  server.start();
});
