const {
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLID,
	GraphQLSchema,
} = require('graphql');

class Transversal {
	#type;
	#MongoModels;
	#FieldSchema;
	#ResolverSchema;

	constructor(MongoModels) {
		this.#MongoModels = MongoModels;
		this.#FieldSchema = {};
		this.#ResolverSchema = {
			query: {
				name: 'RootQuery',
				fields: {},
			},
			mutation: {
				name: 'RootMutation',
				fields: {},
			},
			subscription: {
				name: 'RootSubscription',
				fields: {},
			},
		};
		this.RootSchema = new GraphQLSchema({
			query: new GraphQLObjectType(this.#ResolverSchema.query),
			// mutation: new GraphQLObjectType(this.ResolverSchema.mutation),
			// subscription: new GraphQLObjectType(this.ResolverSchema.subscription),
		});

		this.gql = {};

		this.transversalQuery = async (gql, variables, cacheOption = false) => {
			const request = async (gql, variables) => {
				const res = await fetch('/graphql', {
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
					.then((res) => res.json())
					.then((data) => data);
				return res;
			};

			if (!cacheOption) {
				console.log('caching option not selected');
				const res = await request(gql, variables);
				return res;
			} else {
				console.log('caching option selected');
				// get data from cache server
				// if data is there, then return data
				// if data is not there, call graphql query
				const res = await request(gql, variables);
				// save in cache server
				// return data
				return res;
			}
		};

		// To map Mongo data type to GraphQL data type
		this.#type = {
			String: GraphQLString,
			Number: GraphQLInt,
			ObjectID: GraphQLID,
		};
	}

	/**
	 * Generate GraphQL field schema and save to this.FieldSchema
	 */
	generateFieldSchema() {
		this.#MongoModels.forEach((model) => {
			const fields = {};

			Object.keys(model.schema.paths).forEach((field) => {
				if (field !== '__v') {
					fields[field] = {
						type: this.#type[model.schema.paths[field].instance],
					};
				}
			});

			this.#FieldSchema[model.modelName] = new GraphQLObjectType({
				name: model.modelName,
				fields: () => fields,
			});
		});
	}

	/**
	 * Generate GraphQL query and save to this.RootSchema
	 */
	generateQuery(queryName, fieldSchemaName, resolver, args, isCache) {
		// Generate Resolver
		this.#ResolverSchema.query.fields[queryName] = {
			type: new GraphQLList(this.#FieldSchema[fieldSchemaName]),
			args: args ? args : null,
			resolve: resolver,
		};

		// Generate RootSchema
		this.RootSchema = new GraphQLSchema({
			query: new GraphQLObjectType(this.#ResolverSchema.query),
			// mutation: new GraphQLObjectType(this.ResolverSchema.mutation),
			// subscription: new GraphQLObjectType(this.ResolverSchema.subscription),
		});

		// Generate gql query string
		const gql = this.createGQLString(
			queryName,
			'query',
			this.#FieldSchema[fieldSchemaName],
			args
		);

		this.gql[queryName] = gql;
	}

	createGQLString(name, type, fieldSchema, args) {
		const argStrings = !args
			? null
			: Object.keys(args).reduce(
					(res, arg, idx) => {
						res[0] += `$${arg}: ${args[arg].type}`;
						res[1] += `${arg}: $${arg}`;

						if (Object.keys(args).length - 1 !== idx) {
							res[0] += ', ';
							res[1] += ', ';
						}
						return res;
					},
					['', '']
			  );

		const fieldString = Object.keys(fieldSchema._fields).reduce(
			(str, field, idx) => {
				str += `${field} \n`;
				return str;
			},
			''
		);

		const gqlQuery = args
			? `
      query ${name}(${argStrings[0]}) {
        ${name}(${argStrings[1]}) {
					${fieldString}
				}
      }
      `
			: `
      query ${name} {
        ${name} {
					${fieldString}
				}
      }
      `;

		return gqlQuery;
	}
}

module.exports = Transversal;
