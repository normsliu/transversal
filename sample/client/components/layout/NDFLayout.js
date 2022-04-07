import React, { useState } from 'react';
import Navbar from '../nav/Navbar';
import Drawer from '../drawer/Drawer';
import Footer from '../footer/Footer';

const NDFLayout = ({ children, trans }) => {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen);
	};

	return (
		<>
			<Navbar toggleDrawer={toggleDrawer} />
			<Drawer
				trans={trans}
				drawerOpen={drawerOpen}
				toggleDrawer={toggleDrawer}
			/>
			{children}
			<Footer />
		</>
	);
};

export default NDFLayout;
