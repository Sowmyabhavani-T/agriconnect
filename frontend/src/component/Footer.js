import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import logo from '../images/logo.png'; // Make sure this path is correct

const Footer = () => {
    return (
        <div className="bg-gray-200 w-full py-4 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo */}
                <div>
                    <img src={logo} alt="AgriConnect" className="w-40 mb-4" />
                </div>

                {/* Locations */}
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Our Locations</h3>
                    <div className="mb-4">
                        <span className="flex items-center text-green-700 font-semibold">📍Visakhapatnam</span>
                        <p className="text-gray-600 text-sm">
                            <strong>Corporate Office</strong><br />
                            AgriConnect Pvt Ltd<br />
                            19/2, Dwaraka Nagar, Visakhapatnam - 530016<br />
                            Ph: +91 8247754500
                        </p>
                    </div>
                    <div>
                        <span className="flex items-center text-green-700 font-semibold">📍 Vizianagarm</span>
                        <p className="text-gray-600 text-sm">
                            <strong>Vizianagarm Office</strong><br />
                            AgriConnect Pvt Ltd<br />
                            Plot No 44, Rajam, Vizianagarm - 532127<br />
                            Ph: +91 8247754500
                        </p>
                    </div>
                </div>

                {/* Contact & Social */}
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">✉ Email Us</h3>
                    <p className="text-green-700">tappitasailahari2004@gmail.com</p>

                    <h3 className="text-lg font-bold text-gray-900 mt-6 mb-4">📞 Contact Us</h3>
                    <p className="text-gray-600">+91 8247754500</p>

                    <h3 className="text-lg font-bold text-gray-900 mt-6 mb-4">🌐 Connect with Us</h3>
                    <div className="flex gap-4 text-green-700 text-xl">
                        <a href="#" aria-label="Facebook">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href="#" aria-label="LinkedIn">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>
                        <a href="#" aria-label="Instagram">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="#" aria-label="WhatsApp">
                            <FontAwesomeIcon icon={faWhatsapp} />
                        </a>
                    </div>
                </div>

                {/* Other Links */}
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Other</h3>
                    <ul className="text-gray-600 space-y-2">
                    <li><Link to="/menucategory" className="hover:text-green-700">Agri Store</Link></li>
                        <li><Link to="/about" className="hover:text-green-700">About</Link></li>
                        <li><Link to="/team" className="hover:text-green-700">Our Team</Link></li>
                        <li><Link to="/contact" className="hover:text-green-700">Contact Us</Link></li>
                        
                        <li><Link to="/privacypolicy" className="hover:text-green-700">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-green-700">Terms of Service</Link></li>
                        
                        
                    </ul>
                </div>
            </div>

            {/* Divider Line */}
            <div className="w-full border-t border-gray-400 border-opacity-30 my-4"></div>

            {/* Bottom Section */}
            <div className="text-center text-gray-500 text-[10px] leading-tight py-2">
                <p className="text-sm">&copy; {new Date().getFullYear()} AgriConnect. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
