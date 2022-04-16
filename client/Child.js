import React, { useState, useEffect } from 'react';

const Child = ({ trans }) => {
	const [defaultUsers, setDefaultUsers] = useState();
	const [customUsers, setCustomUsers] = useState();
	const transversalQuery = async (
		gql,
		variables,
		cacheOption = false,
		custom
	) => {
		if (custom) {
			const pattern = /^.+{$/gm;

			const queryString = pattern.exec(gql);
			const queryString2 = pattern.exec(gql);

			gql =
				queryString +
				'\n' +
				queryString2 +
				'\n' +
				custom +
				'\n' +
				'}' +
				'\n' +
				'}';
		}

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
				.then((res) => res.json())
				.then((data) => data);
			return res;
		};

		if (!cacheOption) {
			console.log('caching option not selected');
			const res = await request('/graphql', gql, variables);
			return res;
		} else {
			console.log('caching option selected!');

			const res = await fetch('/transversal', {
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
		}
	};

	useEffect(() => {
		const query = async () => {
			console.log('checking query', trans.transversalQuery);

			const users = await transversalQuery(
				trans.gql.getUsers,
				{
					age: 10,
					height: 10,
				},
				false
			);
			setDefaultUsers(users);

			// const customUsers = await trans.transversalQuery(
			// 	trans.gql.getCustom,
			// 	{
			// 		age: 10,
			// 		height: 10,
			// 	},
			// 	false,
			// 	`firstName
			// 	lastName
			// 	age
			// 	height`
			// );
			// setCustomUsers(customUsers);
		};
		query();
	}, [trans]);
	console.log('Default users', defaultUsers);
	return <h1>Hello World!</h1>;
};

export default Child;
