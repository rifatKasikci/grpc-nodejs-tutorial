let users = {
    1: { id: 1, name: 'Alice' },
    2: { id: 2, name: 'Bob' }
  };
  
  function getUser(call, callback) {
    const user = users[call.request.id];
    if (user) {
      callback(null, user);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Not Found'
      });
    }
  }
  
  function addUser(call, callback) {
    const newUser = {
      id: call.request.id,
      name: call.request.name
    };
    users[call.request.id] = newUser;
    callback(null, { message: 'User added successfully' });
  }
  
  module.exports = {
    getUser,
    addUser
  };
  