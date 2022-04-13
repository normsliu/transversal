import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.css';
import TransversalSocket from '../TransversalSocket';
import Child from './Child';
import NDFLayout from './components/layout/NDFLayout';
import ChartDataProvider from './context/chart/ChartDataContext';

const App = () => {
	const [trans, setTrans] = useState({ data: null });

	const transSocket = new TransversalSocket('http://localhost:3000');

	useEffect(() => {
		transSocket.getTransversalInstance().then((data) => setTrans(data));
	}, []);

	console.log('trans', trans);

	return (
		<Router>
			<div>
				<ChartDataProvider>
					<NDFLayout trans={trans}>
						<Routes>
							<Route exact path='/' element={<Child />} />
						</Routes>
					</NDFLayout>
				</ChartDataProvider>
			</div>
		</Router>
	);
};

export default App;
