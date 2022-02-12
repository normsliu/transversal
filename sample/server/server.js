const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const Transversal = require('../Transversal');
const socketio = require('socket.io');
const { User } = require('./models/mongoModel');
const io = socketio(server);

const PORT = process.env.PORT || 3000;

/**
 * Middlewares
 */
// Handle cross origin
app.use(cors());

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Connect to Mongo DB
 */
const MONGO_URI =
  'mongodb+srv://transversal:1234@cluster0.dhzo8.mongodb.net/transversal?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'transversal',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

/**
 * Instantiate Transversal
 */

const obj = new Transversal([User]);

obj.generateFieldSchema();

const resolver = async (parent, args) => {
  const users = await User.find({});
  console.log(users);
  return users;
};

obj.generateQuery('getUsers', 'User', resolver);

io.on('connection', (socket) => {
  socket.emit('transverse1asdfasdfasd1111f', obj);
});

/**
 * GraphQL route
 */
app.use(
  '/graphql',
  graphqlHTTP({
    schema: obj.RootSchema,
    graphiql: true,
  })
);

// Statically serve everything in the build folder on the route '/build'
if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  // Serve index.html on the route '/'
  app.use('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Server is running on the server ${PORT}`);
});
