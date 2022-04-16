require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const { User, Message } = require('./models/mongoModel');
const PORT = process.env.PORT || 3000;
const socketio = require('socket.io');
const redis = require('redis');
const http = require('http');
const app = express();
const server = http.createServer(app);
const {
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLID,
	GraphQLSchema,
} = require('graphql');

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
 * Initialize Redis Client
 */
const redisClient = redis.createClient({});

const Transversal = require('transversal');
const transversal = new Transversal([User, Message], redisClient);
app.use('/transversal', transversal.cache.cacheMiddleware);
transversal.generateFieldSchema();

// Generate resolver
const userArgs = {
	age: { type: GraphQLInt },
	height: { type: GraphQLInt },
};

// Resolver and arguments
const userResolver = async (parent, args) => {
	const users = await User.find({ age: args.age, height: args.height });
	return users;
};

transversal.generateQuery('getUsers', 'User', userResolver, userArgs);

/**
 *
 * Custom QUery Set Up
 */
// Generate custom field schema
const customSchema = {
	firstName: 'String',
	lastName: 'String',
	age: 'Number',
	height: 'Number',
	school: {
		name: 'String',
		year: 'Number',
		code: {
			code: 'String',
		},
	},
	messages: [{ message: 'String' }],
};

transversal.generateCustomFieldSchema(customSchema, 'customQuery');

// Resolver and arguments
const customResolver = async (parent, args) => {
	const users = await User.find({ age: args.age, height: args.height });
	const messages = await Message.find({});
	users.map((user) => {
		user.messages = messages;
		user.school = {
			name: 'Hello Scool',
			year: 1900,
			code: {
				code: 'D2F',
			},
		};
	});

	return users;
};

const customArgs = {
	age: { type: GraphQLInt },
	height: { type: GraphQLInt },
};

// Generate resolver and query
transversal.generateQuery(
	'getCustom',
	'customQuery',
	customResolver,
	customArgs
);

const json = transversal.jsonStringify(transversal);

/**
 * Socket IO - Bi-directional connection with client
 */

const socket = transversal.instantiateSocket(server, 'http://localhost:8080');
socket.openConnection(json);

/**
 * GraphQL route
 */
app.use(
	'/graphql',
	graphqlHTTP({
		schema: transversal.RootSchema,
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
server.listen(PORT, () => {
	console.log(`Server is running on the server ${PORT}`);
});