import React, { useState, useEffect } from 'react';
import Query from './components/Query';
import './transV.css';

const TransV = ({ trans, toggleDrawer }) => {
	const [isQuery, setIsQuery] = useState(true);
	const [chartData, setChartData] = useState([]);

	const toggleQuery = () => {
		setIsQuery(!isQuery);
	};

	return (
		<>
			<div className='trans-header'>
				<h1>TransV</h1>
				<button onClick={toggleQuery}>{isQuery ? 'Mutation' : 'Query'}</button>
			</div>

			<Query
				isQuery={isQuery}
				trans={trans}
				toggleDrawer={toggleDrawer}
				setChartData={setChartData}
			/>
		</>
	);
};

export default TransV;
