const { RedisPubSub } = require('graphql-redis-subscriptions');
const Redis = require('ioredis');

function TransversalPubSub(url) {
	return new RedisPubSub({
		publisher: new Redis(url),
		subscriber: new Redis(url),
	});
}

module.exports = TransversalPubSub;
