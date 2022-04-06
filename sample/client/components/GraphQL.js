import React, { useEffect } from 'react';

const GraphQL = () => {
	useEffect(() => {
		window.location.href = 'http://localhost:5000/graphql';
	}, []);

	return <div>GraphQL</div>;
};

export default GraphQL;
