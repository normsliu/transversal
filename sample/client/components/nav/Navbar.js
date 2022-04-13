import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Button } from './../button/Button';
import './navbar.css';

const Navbar = ({ toggleDrawer }) => {
	const [click, setClick] = useState(false);
	const [button, setButton] = useState(true);

	const handleClick = () => {
		setClick(!click);
	};

	const closeMobileMenu = () => {
		setClick(false);
	};

	const showButton = () => {
		if (window.innerWidth <= 960) {
			setButton(false);
		} else {
			setButton(true);
		}
	};

	window.addEventListener('resize', showButton);

	return (
		<>
			<IconContext.Provider value={{ color: 'white' }}>
				<div className='navbar'>
					<div className='navbar-container container'>
						<Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
							TransversaL
						</Link>
						<div className='menu-icon' onClick={handleClick}>
							{click ? <FaTimes /> : <FaBars />}
						</div>
						<ul className={click ? 'nav-menu active' : 'nav-menu'}>
							<li className='nav-item'>
								<Link
									to='/history'
									className='nav-links'
									onClick={closeMobileMenu}>
									History
								</Link>
							</li>

							<li className='nav-item'>
								<a
									className='nav-links'
									onClick={closeMobileMenu}
									href='http://localhost:3000/graphql'>
									Graphiql
								</a>
							</li>
							<li className='nav-btn'>
								{button ? (
									<div className='btn-link'>
										<Button buttonStyle='btn--outline' onClick={toggleDrawer}>
											TransV
										</Button>
									</div>
								) : (
									<div className='btn-link' onClick={closeMobileMenu}>
										<Button buttonStyle='btn--outline' buttonSize='btn--mobile'>
											TransV
										</Button>
									</div>
								)}
							</li>
						</ul>
					</div>
				</div>
			</IconContext.Provider>
		</>
	);
};

export default Navbar;
