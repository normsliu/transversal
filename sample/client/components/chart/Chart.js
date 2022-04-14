import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import Widget from '../widget/Widget';
import './chart.css';

const Chart = ({ chartName, data }) => {
	return (
		<>
			<div className='title'>
				<h1>{chartName}</h1>
			</div>

			<div className='chart-main'>
				<div className='chart'>
					<ResponsiveContainer width='100%' aspect={3}>
						<LineChart
							width={500}
							height={300}
							data={data}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5,
							}}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='poll' />
							<YAxis />
							<Tooltip />
							<Legend />
							<Line
								type='monotone'
								dataKey='responseTime'
								stroke='#8884d8'
								activeDot={{ r: 8 }}
							/>
							<Line type='monotone' dataKey='size' stroke='#82ca9d' />
						</LineChart>
					</ResponsiveContainer>
				</div>
				<div className='widget'>
					<Widget />
				</div>
			</div>
		</>
	);
};

export default Chart;
