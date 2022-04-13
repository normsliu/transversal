import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
	return (
		<div className='footer-container'>
			<div className='footer'>
				<small className='footer-logo'>TransversaL © 2022</small>
				<div className='social-icons'>
					<Link
						className='social-icon-link'
						to='/'
						target='_blank'
						aria-label='github'>
						<FaGithub />
					</Link>
					<Link
						className='social-icon-link'
						to='/'
						target='_blank'
						aria-label='LinkedIn'>
						<FaLinkedin />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Footer;
