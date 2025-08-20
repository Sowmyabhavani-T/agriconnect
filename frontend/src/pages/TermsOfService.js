import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Footer from '../component/Footer';


const TermsOfService = () => {
    // Get the current date
    const currentDate = new Date().toLocaleDateString();

    return (
        <>
        <div className="p-5 max-w-3xl mx-auto">
            
            <h1 className="text-3xl font-bold mb-4">Terms of Service for AgriConnect</h1>
            <p><strong>Effective Date:</strong> {currentDate}</p>
            <p className="text-justify">
                Welcome to AgriConnect! These Terms of Service govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms. If you do not agree with any part of these terms, you must not use our services.
            </p>

            <h2 className="text-2xl font-semibold mt-4">1. Acceptance of Terms</h2>
            <p className="text-justify">
                By using our services, you affirm that you are at least 18 years old or have the consent of a parent or guardian. If you are using the services on behalf of an organization, you represent that you have the authority to bind that organization to these terms.
            </p>

            <h2 className="text-2xl font-semibold mt-4">2. Changes to Terms</h2>
            <p className="text-justify">
                We reserve the right to modify these Terms of Service at any time. We will notify you of any changes by posting the new Terms of Service on this page. You are advised to review these terms periodically for any changes. Changes to these terms are effective when they are posted on this page.
            </p>

            <h2 className="text-2xl font-semibold mt-4">3. User Accounts</h2>
            <p className="text-justify">
                To access certain features of our services, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h2 className="text-2xl font-semibold mt-4">4. User Conduct</h2>
            <p className="text-justify">
                You agree to use our services only for lawful purposes and in accordance with these Terms of Service. You agree not to:
            </p>
            <ul className="list-disc ml-5">
                <li>Use the services in any way that violates any applicable federal, state, local, or international law or regulation.</li>
                <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the services.</li>
                <li>Impersonate or attempt to impersonate AgriConnect, a AgriConnect employee, another user, or any other person or entity.</li>
                <li>Use the services in any manner that could disable, overburden, damage, or impair the site or interfere with any other party's use of the services.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-4">5. Intellectual Property Rights</h2>
            <p className="text-justify">
                The content, features, and functionality of the services, including but not limited to text, graphics, logos, and software, are owned by AgriConnect or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of any content without our express written permission.
            </p>

            <h2 className="text-2xl font-semibold mt-4">6. Limitation of Liability</h2>
            <p className="text-justify">
                In no event shall AgriConnect, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of, or inability to access or use, the services; (ii) any conduct or content of any third party on the services; (iii) any content obtained from the services; and (iv) unauthorized access, use, or alteration of your transmissions or content.
            </p>

            <h2 className="text-2xl font-semibold mt-4">7. Governing Law</h2>
            <p className="text-justify">
                These Terms of Service shall be governed by and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law principles. Any legal action or proceeding arising out of or related to these terms shall be brought exclusively in the courts located in [Your City/State].
            </p>

            <h2 className="text-2xl font-semibold mt-4">8. Contact Us</h2>
            <p className="text-justify">
                If you have any questions about these Terms of Service, please contact us by visiting our <Link to="/contact" className="text-blue-500 underline">Contact Page</Link>.
            </p>
            
        </div>
        <div>
            <Footer/>
        </div>

        </>
    );
};

export default TermsOfService;