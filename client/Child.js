import React, { useState, useEffect } from 'react';

const Child = ({ trans }) => {
	const [defaultUsers, setDefaultUsers] = useState();
	const [customUsers, setCustomUsers] = useState();

	useEffect(() => {
		console.log('mounting', trans.transversalQuery);
		const res = fetch('/graphql');
		// const query = async () => {
		// 	const users = await trans.transversalQuery(
		// 		trans.gql.getUsers,
		// 		{
		// 			age: 10,
		// 			height: 10,
		// 		},
		// 		false
		// 	);
		// 	console.log('users', users);
		// 	setDefaultUsers(users);

		// 	const customUsers = await trans.transversalQuery(
		// 		trans.gql.getCustom,
		// 		{
		// 			age: 10,
		// 			height: 10,
		// 		},
		// 		false,
		// 		`firstName
		// 		lastName
		// 		age
		// 		height`
		// 	);
		// 	setCustomUsers(customUsers);
		// };
		query();
	}, [trans]);

	return <h1>Hello World!</h1>;
};

export default Child;
