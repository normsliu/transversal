import React, { useState, useRef } from 'react';
import './query.css';
import chartDataConsumer from '../../../context/chart/chartDataConsumer';

const Query = ({ isQuery, trans, toggleDrawer, setChartData }) => {
	const [name, setName] = useState('');
	const [args, setArgs] = useState('');
	const [cache, setCache] = useState(false);
	const [custom, setCustom] = useState('');
	const [poll, setPoll] = useState(null);
	const argsPlaceHolder = useRef(null);
	const { updateChartData } = chartDataConsumer();

	const handleChange = (e, fn) => {
		fn(e.target.value);
	};
	const handleCheckboxChange = () => {
		setCache(!cache);
	};
	const handleArgsChange = (e) => {
		setName(e.target.value);
		console.log(e.target.value);
		if (trans.gql[e.target.value]) {
			const pattern = /[$].+[)]/gm;
			const queryString = pattern.exec(trans.gql[e.target.value]);
			return (argsPlaceHolder.current = queryString[0].slice(
				0,
				queryString[0].length - 1
			));
		}
		argsPlaceHolder.current = null;
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
		return sizeOf(obj);
	}

	//time-logger function
	const pingPong = async (e) => {
		e.preventDefault();

		const queryName = name;
		const properties = args.split(', ');
		const argsObject = {};

		// const storageObj = window.localStorage.getItem(queryName);
		const storageObj = window.localStorage.getItem('chartData')
			? JSON.parse(window.localStorage.getItem('chartData'))
			: {};

		console.log(storageObj);

		let count = storageObj[queryName] ? storageObj[queryName]['count'] : 0;

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

			const chartItemObj = {
				poll: `poll${++count}`,
				reponseTime: endTime - startTime,
				payload: payload,
				size: memorySizeOf(payload),
			};
			if (storageObj[queryName]) {
				const storageArray = storageObj[queryName]
					? [...storageObj[queryName]['chartData'], chartItemObj]
					: [chartItemObj];
				storageObj[queryName]['chartData'] = storageArray;
				storageObj[queryName]['count'] = count;
			} else {
				storageObj[queryName] = {
					chartData: [chartItemObj],
					count: count,
				};
			}

			window.localStorage.setItem('chartData', JSON.stringify(storageObj));

			setChartData(storageObj);
			updateChartData(storageObj);
		} else {
			const chartItemArr = [];

			for (let i = 0; i < poll; i++) {
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

				chartItemArr.push({
					poll: `poll${++count}`,
					responseTime: endTime - startTime,
					payload: payload,
					size: memorySizeOf(payload),
				});
			}
			//check if localsotrage with queyname exists
			if (storageObj[queryName]) {
				const storageArray = storageObj[queryName]
					? [...storageObj[queryName]['chartData'], ...chartItemArr]
					: [...chartItemArr];
				storageObj[queryName]['chartData'] = storageArray;
				storageObj[queryName]['count'] = count;
			} else {
				storageObj[queryName] = {
					chartData: chartItemArr,
					count: count,
				};
			}

			window.localStorage.setItem('chartData', JSON.stringify(storageObj));

			setChartData(storageObj);
			updateChartData(storageObj);
		}
		setName('');
		setArgs('');
		setCache(false);
		setCustom('');
		setPoll(null);
		toggleDrawer();
		argsPlaceHolder.current = null;
	};

	return (
		<>
			{isQuery ? (
				<>
					<form
						className='trans-form'
						onSubmit={(e) => {
							pingPong(e);
						}}>
						<h3>Query</h3>

						<label>
							Query Name:
							<select value={name} onChange={(e) => handleArgsChange(e)}>
								<option value='' disabled selected>
									Select your query
								</option>
								{trans.gql &&
									Object.keys(trans.gql).map((key, index) => {
										return (
											<option key={`${key}${index}`} value={key}>
												{key}
											</option>
										);
									})}
							</select>
						</label>
						<label>
							Args:
							<textarea
								type='text'
								name='args'
								col={30}
								row={60}
								value={args}
								placeholder={
									argsPlaceHolder.current
										? argsPlaceHolder.current
										: 'ex) name: value'
								}
								onChange={(e) => handleChange(e, setArgs)}
							/>
						</label>
						<label>
							Cache:
							<input
								style={{ width: 20, height: 20 }}
								type='checkbox'
								name='cache'
								onChange={handleCheckboxChange}
							/>
						</label>
						<label>
							Custom Response:
							<textarea
								type='text'
								name='custom'
								value={custom}
								placeholder='ex) age height firstName'
								onChange={(e) => handleChange(e, setCustom)}
							/>
						</label>
						<label>
							Poll:
							<input
								type='text'
								name='poll'
								value={poll}
								placeholder='enter # of polls'
								onChange={(e) => handleChange(e, setPoll)}
							/>
						</label>
						<input type='submit' value='Submit' />
					</form>
				</>
			) : (
				<>
					<form
						className='trans-form'
						onSubmit={(e) => {
							pingPong(e);
						}}>
						<h3>Mutation</h3>
						<label>
							Mutation Name:
							<select value={name} onChange={(e) => handleArgsChange(e)}>
								<option value='' disabled selected>
									Select your mutation
								</option>
								{trans.gql &&
									Object.keys(trans.gql).map((key, index) => {
										return (
											<option key={`${key}${index}`} value={key}>
												{key}
											</option>
										);
									})}
							</select>
						</label>
						<label>
							Args:
							<textarea
								col={30}
								row={60}
								type='text'
								name='args'
								placeholder={
									argsPlaceHolder.current
										? argsPlaceHolder.current
										: 'ex) name: value'
								}
								onChange={(e) => handleChange(e, setArgs)}
							/>
						</label>
						{/* <label>
    Cache:
    <input type="checkbox" name="cache" onChange ={(e)=> handleCheckboxChange()}/>
  </label> */}
						<label>
							Custom Response:
							<textarea
								col={30}
								row={60}
								type='text'
								name='custom'
								value={custom}
								placeholder='ex) age height firstName'
								onChange={(e) => handleChange(e, setCustom)}
							/>
						</label>
						<label>
							Poll:
							<input
								type='text'
								name='poll'
								value={poll}
								placeholder='enter # of polls'
								onChange={(e) => handleChange(e, setPoll)}
							/>
						</label>
						<input type='submit' value='Submit' />
					</form>
				</>
			)}
		</>
	);
};

export default Query;
