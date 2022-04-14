import React from 'react';
import Chart from '../chart/Chart';
import chartDataConsumer from '../../context/chart/chartDataConsumer';
import './hero.css';

const Hero = () => {
	const { chartDataObj } = chartDataConsumer();

	return (
		<div className='hero-main'>
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

export default Hero;
