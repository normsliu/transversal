import React from 'react';
import Chart from './components/chart/Chart';
import chartDataConsumer from './context/chart/chartDataConsumer';

const Child = () => {
	const { chartDataObj } = chartDataConsumer();

	return (
		<div>
			<h1>Hello World!</h1>

			{chartDataObj
				? Object.keys(chartDataObj).map((item, index) => {
						return (
							<Chart
								key={`${item}${index}`}
								data={chartDataObj[item].chartData}
								chartName={item}
							/>
						);
				  })
				: 'Insert Hero'}
		</div>
	);
};

export default Child;
