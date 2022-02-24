import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';

// Parse object with methods
function parser(name, val) {
	if (
		val &&
		typeof val === 'string' &&
		(val.startsWith('function') || val.startsWith('async'))
	) {
		return new Function('return ' + val)();
	} else {
		return val;
	}
}

const App = () => {
	const socket = io('http://localhost:3000');

	socket.on('connect', () => console.log(socket.id));

	socket.on('transverse', async (gql) => {
		// Store gql object from the server
		const gqlObj = JSON.parse(gql, parser);

		console.log('GQL Object from server..', gqlObj);

		const users = await gqlObj.transversalQuery(gqlObj.gql.getUsers, {
			age: 10,
			height: 10,
		});
		console.log('Response: ', users);
	});

	return (
		<Router>
			<div className='container'>
				<Routes>
					<Route exact path='/' element={<h1>Hellow World!</h1>} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
