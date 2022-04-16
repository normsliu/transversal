import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Child from './Child';
// import { TransversalSocket } from 'transversal';
import TransversalSocket from './old';

const App = () => {
	const [trans, setTrans] = useState({ data: null });

	const transSocket = new TransversalSocket('http://localhost:3000');

	useEffect(() => {
		transSocket.getTransversalInstance().then((data) => setTrans(data));
	}, []);

	return (
		<Router>
			<div className='container'>
				<Routes>
					<Route exact path='/' element={<Child trans={trans} />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
