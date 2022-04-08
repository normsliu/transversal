import React, { useState, useEffect, createContext } from 'react';

export const ChartDataContext = createContext({});

const ChartDataProvider = ({ children }) => {
	const [chartDataObj, setChartDataObj] = useState(null);

	const updateChartData = (obj) => {
		setChartDataObj(obj);
	};

	useEffect(() => {
		setChartDataObj(JSON.parse(window.localStorage.getItem('chartData')));
	}, []);

	return (
		<ChartDataContext.Provider
			value={{
				chartDataObj,
				updateChartData,
			}}>
			{children}
		</ChartDataContext.Provider>
	);
};

export default ChartDataProvider;
