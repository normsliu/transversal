import React, { useState, useEffect } from 'react';
import Query from './components/Query';
import './transV.css';

const TransV = ({ trans, setDrawerOpen }) => {
	const [times, setTimes] = useState([]);
	const [isQuery, setIsQuery] = useState(true);

	const toggleQuery = () => {
		setIsQuery(!isQuery);
	};

	//function for retrieving data size of payload
	function memorySizeOf(obj) {
		var bytes = 0;

		function sizeOf(obj) {
			if (obj !== null && obj !== undefined) {
				switch (typeof obj) {
					case 'number':
						bytes += 8;
						break;
					case 'string':
						bytes += obj.length * 2;
						break;
					case 'boolean':
						bytes += 4;
						break;
					case 'object':
						var objClass = Object.prototype.toString.call(obj).slice(8, -1);
						if (objClass === 'Object' || objClass === 'Array') {
							for (var key in obj) {
								if (!obj.hasOwnProperty(key)) continue;
								sizeOf(obj[key]);
							}
						} else bytes += obj.toString().length * 2;
						break;
				}
			}
			return bytes;
		}

		// function formatByteSize(bytes) {
		// 	if (bytes < 1024) return bytes + ' bytes';
		// 	else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + ' KiB';
		// 	else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + ' MiB';
		// 	else return (bytes / 1073741824).toFixed(3) + ' GiB';
		// }

		// return formatByteSize(sizeOf(obj));
		return sizeOf(obj);
	}

	//time-logger function
	const pingPong = async (e, transObject) => {
		e.preventDefault();

		const { name, args, cache, custom, poll } = transObject;
		const queryName = name;
		const properties = args.split(', ');
		const argsObject = {};

		if (poll === 1) {
			properties.forEach((prop) => {
				const arr = prop.split(': ');
				return Number(arr[1])
					? (argsObject[arr[0]] = Number(arr[1]))
					: (argsObject[arr[0]] = arr[1]);
			});

			const startTime = new Date().getTime();
			let endTime = null;

			const payload = await trans.transversalQuery(
				trans.gql[name],
				argsObject,
				cache,
				custom
			);

			endTime = new Date().getTime();
			const dataSize = memorySizeOf(payload);
			setTimes({
				queryName: queryName,
				reponseTime: endTime - startTime,
				payload: payload,
				size: dataSize,
			});
			setDrawerOpen(false);
		} else {
			const time = [];
			let payload = null;
			for (let i = 0; i < poll; i++) {
				properties.forEach((prop) => {
					const arr = prop.split(': ');
					return Number(arr[1])
						? (argsObject[arr[0]] = Number(arr[1]))
						: (argsObject[arr[0]] = arr[1]);
				});

				const startTime = new Date().getTime();
				let endTime = null;

				payload = await trans.transversalQuery(
					trans.gql[name],
					argsObject,
					cache,
					custom
				);

				endTime = new Date().getTime();
				const dataSize = memorySizeOf(payload);
				time.push(endTime - startTime);
			}
			setTimes({
				query: queryName,
				responseTimes: time,
				payload: payload,
				size: dataSize,
			});
			setDrawerOpen(false);
		}
	};
	console.log(times);
	return (
		<div>
			<div className='trans-header'>
				<h1>TransV</h1>
				<button onClick={toggleQuery}>{isQuery ? 'Mutation' : 'Query'}</button>
			</div>

			<Query pingPong={pingPong} isQuery={isQuery} trans={trans} />
		</div>
	);
};

export default TransV;
