import React from 'react';
import './drawer.css';
import TransV from '../tester/TransV';
import { FaAngleDoubleLeft } from 'react-icons/fa';

const Drawer = ({ drawerOpen, trans, setDrawerOpen }) => {
	return (
		<div className={drawerOpen ? 'side-drawer open' : 'side-drawer'}>
			<div className='side-drawer-contents'>
				<div>
					<FaAngleDoubleLeft onClick={() => setDrawerOpen()} />
				</div>
				<TransV trans={trans} setDrawerOpen={setDrawerOpen} />
				{trans.gql &&
					Object.keys(trans.gql).map((key, index) => {
						return <div key={`${key}${index}`}>{key}</div>;
					})}
			</div>
		</div>
	);
};

export default Drawer;
