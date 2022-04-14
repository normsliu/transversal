import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
	return (
		<div className='footer-container'>
			<div className='footer'>
				<small className='footer-logo'>TransversaL © 2022</small>
				<div className='social-icons'>
					<a
						className='social-icon-link'
						href='https://github.com/oslabs-beta/transversal'
						target='_blank'
						rel='noopener noreferrer'
						aria-label='github'>
						<FaGithub />
					</a>
					<a
						className='social-icon-link'
						href='/'
						target='_blank'
						rel='noopener noreferrer'
						aria-label='LinkedIn'>
						<FaLinkedin />
					</a>
				</div>
			</div>
		</div>
	);
};

export default Footer;
