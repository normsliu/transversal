const { RedisPubSub } = require('graphql-redis-subscriptions');
const Redis = require('ioredis');

class TransversalPubSub {
	constructor(url) {
		this.url = url;
	}
	createClient() {
		return new RedisPubSub({
			publisher: new Redis(this.url),
			subscriber: new Redis(this.url),
		});
	}
}

module.exports = TransversalPubSub;
