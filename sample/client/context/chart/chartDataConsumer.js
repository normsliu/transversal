import React, { useContext } from 'react';
import { ChartDataContext } from './ChartDataContext';

const chartDataConsumer = () => {
	const { chartDataObj, updateChartData } = useContext(ChartDataContext);
	return { chartDataObj, updateChartData };
};

export default chartDataConsumer;
