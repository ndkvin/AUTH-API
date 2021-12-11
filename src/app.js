require('dotenv').config();
const createServer = require('./Infrastructures/http/createServer');
const contaienr = require('./Infrastructures/container');

const start = async () => {
  const server = await createServer(contaienr);
  await server.start();
  console.log(`server sedang berjalan pada ${server.info.uri}`);
};

start();
