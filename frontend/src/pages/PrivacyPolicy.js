import React from 'react';

import Footer from '../component/Footer';

const PrivacyPolicy = () => {
    // Get the current date


    return (
        <>
        <div className="p-5 max-w-3xl mx-auto">
       
            <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy for AgriConnect</h1>
            <p><strong>Last Modified:</strong> 04-04-2025</p>
            <p className="text-justify">
                At AgriConnect, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website [insert website URL] and use our services. Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.
            </p>

            <h2 className="text-2xl font-semibold mt-4">1. Information We Collect</h2>
            <p className="text-justify">We may collect information about you in a variety of ways, including:</p>

            <h3 className="text-lg font-semibold mt-2">1.1 Personal Data</h3>
            <p className="text-justify">
                While using our service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include, but is not limited to:
            </p>
            <ul className="list-disc ml-5">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Address</li>
                <li>Profile picture</li>
                <li>Payment information (if applicable)</li>
            </ul>

            <h3 className="text-lg font-semibold mt-2">1.2 Usage Data</h3>
            <p className="text-justify">
                We may also collect information on how the service is accessed and used. This usage data may include information such as your computer's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.
            </p>

            <h2 className="text-2xl font-semibold mt-4">2. How We Use Your Information</h2>
            <p className="text-justify">AgriConnect uses the collected data for various purposes:</p>
            <ul className="list-disc ml-5">
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>To allow you to participate in interactive features of our service when you choose to do so</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our service</li>
                <li>To monitor the usage of our service</li>
                <li>To detect, prevent, and address technical issues</li>
                <li>To fulfill any other purpose for which you provide it</li>
                <li>To provide you with news, special offers, and general information about other goods, services, and events which we offer that are similar to those that you have already purchased or inquired about unless you have opted not to receive such information</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-4">3. Disclosure of Your Information</h2>
            <p className="text-justify">We may share your information in the following situations:</p>
            <ul className="list-disc ml-5">
                <li>With Service Providers: We may share your personal information with service providers to monitor and analyze the use of our service, to contact you.</li>
                <li>For Business Transfers: We may share or transfer your personal information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our service to another company.</li>
                <li>With Affiliates: We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy.</li>
                <li>With Business Partners: We may share your information with our business partners to offer you certain products, services, or promotions.</li>
                <li>With Your Consent: We may disclose your personal information for any other purpose with your consent.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-4">4. Security of Your Information</h2>
            <p className="text-justify">
                The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>

            <h2 className="text-2xl font-semibold mt-4">5. Your Data Protection Rights</h2>
            <p className="text-justify">If you are a resident of the European Economic Area (EEA), you have certain data protection rights. AgriConnect aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</p>
            <ul className="list-disc ml-5">
                <li>The right to access, update, or delete the information we have on you.</li>
                <li>The right to rectification. You have the right to have your information rectified if that information is inaccurate or incomplete.</li>
                <li>The right to object. You have the right to object to our processing of your Personal Data.</li>
                <li>The right of restriction. You have the right to request that we restrict the processing of your personal information.</li>
                <li>The right to data portability. You have the right to be provided with a copy of the information we have on you in a structured, machine-readable, and commonly used format.</li>
                <li>The right to withdraw consent. You also have the right to withdraw your consent at any time where AgriConnect relied on your consent to process your personal information.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-4">6. Links to Other Sites</h2>
            <p className="text-justify">
                Our service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy and terms of service of any site you visit.
            </p>
            <p className="text-justify">
                We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </p>

            <h2 className="text-2xl font-semibold mt-4">7. Changes to This Privacy Policy</h2>
            <p className="text-justify">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
            <p className="text-justify">
                We will let you know via email and/or a prominent notice on our service, prior to the change becoming effective, and update the "effective date" of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>

            <h2 className="text-2xl font-semibold mt-4">8. Contact Us</h2>
            <p className="text-justify">
                If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-disc ml-5">
                <li>By email: [insert email address]</li>
                <li>By visiting this page on our website: [insert website URL]</li>
                <li>By phone number: [insert phone number]</li>
            </ul>
            
        </div>
        <div>
            <Footer/>
        </div>

        </>
    );
};

export default PrivacyPolicy;