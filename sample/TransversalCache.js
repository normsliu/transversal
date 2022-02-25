const redis = require('redis');
const Transversal = require('./Transversal');
const fetch = require('node-fetch');

class TransversalCache {
	constructor(redisClient) {
		
		/**
		 * Connect Redis Client
		 */
		this.client = redisClient;
		this.client.connect();
		this.client.on('error', (err) => console.log('Redis Client Error', err));

		/**
		 * Middleware
		 * @param {*} req 
		 * @param {*} res 
		 * @returns 
		 */
		this.cacheMiddleware = async (req, res) => {
			const request = async (endpoint, gql, variables) => {
				const res = await fetch(endpoint, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify({
						query: gql,
						variables: variables,
					}),
				})
					.then((res) => {console.log('This is res:', res); res.json();})
					.then((data) => console.log('Data is: ', data));
				return res;
			};

			console.log('cache request from frontend');

			// TODO: Need the correct query, replace 'data'
			let cache = await this.get('data');
			cache = JSON.parse(cache);
			// Does the key exist in Redis Database
			if (this.client.exists('data') === 0) {
				const data = await request(
					'http://localhost:3000/graphql',
					req.body.query,
					req.body.variables
				);
				await this.set('data', JSON.stringify(data));

				return res.status(200).json(data);
			} else {
				return res.status(200).json({ cache: cache });
			}

			// await this.set('name', 'kim');
			// const myName = await this.get('name');
			// console.log('request', myName);
			return res.status(200).json({ response: 'hi' });
		};
	}

	async set(name, data) {
		try {
			await this.client.set(name, data);
			console.log('Data saved in redis...');
		} catch (err) {
			console.log('Data save failed in redis...');
		}
	}

	async get(name) {
		try {
			const data = await this.client.get(name);
			console.log('Successfully retrieved data from redis...');
			return data;
		} catch (err) {
			console.log('Failed to retrieve data from redis...');
		}
	}
}

module.exports = TransversalCache;
