import React, { useState, useEffect } from 'react';

const Child = ({ trans }) => {
	const [defaultUsers, setDefaultUsers] = useState();
	const [customUsers, setCustomUsers] = useState();

	useEffect(() => {
		const query = async () => {
			console.log('mounting', trans.transversalQuery);
			// const res = await fetch('/graphql', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 		Accept: 'application/json',
			// 	},
			// 	body: JSON.stringify({
			// 		query: trans.gql.getUsers,
			// 		variables: { age: 10, height: 10 },
			// 	}),
			// })
			// 	.then((res) => res.json())
			// 	.then((data) => data);
			// console.log('done?', res);
			// return res;

			const users = await trans.transversalQuery(
				trans.gql.getUsers,
				{
					age: 10,
					height: 10,
				},
				true
			);
			console.log('users', users);
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

	return <h1>Hello World!</h1>;
};

export default Child;
