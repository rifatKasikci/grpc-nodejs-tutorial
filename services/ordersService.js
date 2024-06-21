let orders = {
    1: { id: 1, product: 'Book', quantity: 3 },
    2: { id: 2, product: 'Pen', quantity: 10 }
  };
  
  function getOrder(call, callback) {
    const order = orders[call.request.id];
    if (order) {
      callback(null, order);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Not Found'
      });
    }
  }
  
  function addOrder(call, callback) {
    const newOrder = {
      id: call.request.id,
      product: call.request.product,
      quantity: call.request.quantity
    };
    orders[call.request.id] = newOrder;
    callback(null, { message: 'Order added successfully' });
  }
  
  module.exports = {
    getOrder,
    addOrder
  };
  