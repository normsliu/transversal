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

const data = [
	{
		name: 'Poll A',
		time: 4000,
		size: 2400,
	},
	{
		name: 'Poll B',
		time: 3000,
		size: 1398,
	},
	{
		name: 'Poll C',
		time: 2000,
		size: 9800,
	},
	{
		name: 'Poll D',
		time: 2780,
		size: 3908,
	},
	{
		name: 'Poll E',
		time: 1890,
		size: 4800,
	},
	{
		name: 'Poll F',
		time: 2390,
		size: 3800,
	},
	{
		name: 'Poll G',
		time: 3490,
		size: 4300,
	},
];

const Chart = () => {
	return (
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
				<XAxis dataKey='name' />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type='monotone'
					dataKey='time'
					stroke='#8884d8'
					activeDot={{ r: 8 }}
				/>
				<Line type='monotone' dataKey='size' stroke='#82ca9d' />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default Chart;
