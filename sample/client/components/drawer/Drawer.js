import React from 'react';
import './drawer.css';
import TransV from '../tester/TransV';
import { FaAngleDoubleLeft } from 'react-icons/fa';

const Drawer = ({ drawerOpen, trans, toggleDrawer }) => {
	return (
		<div className={drawerOpen ? 'side-drawer open' : 'side-drawer'}>
			<div className='side-drawer-contents'>
				<div className='toggle-arrow'>
					<FaAngleDoubleLeft onClick={toggleDrawer} />
				</div>
				<TransV trans={trans} toggleDrawer={toggleDrawer} />
			</div>
		</div>
	);
};

export default Drawer;
