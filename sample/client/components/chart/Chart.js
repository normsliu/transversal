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

const Chart = ({ chartName, data }) => {
	return (
		<div>
			<h1>{chartName}</h1>

			<ResponsiveContainer width='50%' aspect={3}>
				<LineChart
					width={500}
					height={500}
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
	);
};

export default Chart;
