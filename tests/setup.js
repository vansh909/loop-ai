const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongod;

module.exports = {
  setUp: async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
  },
  
  tearDown: async () => {
    await mongoose.disconnect();
    await mongod.stop();
  }
};