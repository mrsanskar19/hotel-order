'use client';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="w-full bg-[#FFF9E6] py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-gray-900 mb-6">
          Privacy Policy
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed">
          Your privacy is important to us. This Privacy Policy explains how FoodsLinkX 
          collects, uses, and safeguards your information.
        </p>
      </section>

      {/* Content Section */}
      <section className="container max-w-4xl mx-auto py-16 px-6 space-y-12">
        {/* 1. Introduction */}
        <div>
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            FoodsLinkX is a hotel and restaurant order management software. 
            We respect your privacy and are committed to protecting the personal 
            information you share with us. This document outlines our data 
            practices and your rights.
          </p>
        </div>

        {/* 2. Data We Collect */}
        <div>
          <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 leading-relaxed">
            <li><strong>Account Data:</strong> Name, email address, phone number, and hotel details you provide when signing up.</li>
            <li><strong>Order Data:</strong> Guest orders, menu selections, and transaction records processed through the platform.</li>
            <li><strong>Technical Data:</strong> Device information, browser type, IP address, and cookies for security and performance.</li>
          </ul>
        </div>

        {/* 3. How We Use Data */}
        <div>
          <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            We use the collected information to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 leading-relaxed">
            <li>Provide and improve our software services.</li>
            <li>Process hotel and guest orders securely.</li>
            <li>Communicate updates, support, and marketing offers (only if you opt-in).</li>
            <li>Ensure security, prevent fraud, and comply with legal obligations.</li>
          </ul>
        </div>

        {/* 4. Data Sharing */}
        <div>
          <h2 className="text-2xl font-bold mb-4">4. Data Sharing</h2>
          <p className="text-gray-700 leading-relaxed">
            We do not sell your personal information. Data may only be shared with:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 leading-relaxed mt-2">
            <li>Trusted service providers who support our platform (e.g., hosting, payments).</li>
            <li>Authorities, if required by law or to protect rights and safety.</li>
          </ul>
        </div>

        {/* 5. Data Security */}
        <div>
          <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We implement a variety of security measures to maintain the safety of your personal information.
            Your personal information is contained behind secured networks and is only accessible by a limited
            number of persons who have special access rights to such systems, and are required to keep the
            information confidential. In addition, all sensitive/credit information you supply is encrypted
            via Secure Socket Layer (SSL) technology.
          </p>
        </div>

        {/* 6. Security of Your Data */}
        <div>
          <h2 className="text-2xl font-bold mb-4">6. Security of Your Data</h2>
          <p className="text-gray-700 leading-relaxed">
            We use industry-standard security measures, including encryption and 
            secure data storage, to protect your information against unauthorized access. 
            However, no method of transmission is 100% secure.
          </p>
        </div>

        {/* 7. Your Rights */}
        <div>
          <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Depending on your region, you may have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 leading-relaxed">
            <li>Access the personal information we hold about you.</li>
            <li>Request corrections or updates to your data.</li>
            <li>Request deletion of your personal information.</li>
            <li>Opt out of marketing communications.</li>
          </ul>
        </div>

        {/* 8. Cookies & Tracking */}
        <div>
          <h2 className="text-2xl font-bold mb-4">8. Cookies & Tracking</h2>
          <p className="text-gray-700 leading-relaxed">
            FoodsLinkX uses cookies and similar technologies to improve your 
            experience, analyze usage, and ensure security. You can manage 
            cookies through your browser settings.
          </p>
        </div>

        {/* 9. Updates to this Policy */}
        <div>
          <h2 className="text-2xl font-bold mb-4">9. Updates to this Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. Updates will 
            be posted on this page with a revised "Last Updated" date.
          </p>
        </div>

        {/* 10. Contact Us */}
        <div>
          <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about this Privacy Policy or how we 
            handle your data, please contact us at:
          </p>
          <p className="mt-2 text-gray-700 font-semibold">
            📧 foodlinkx.com@gmail.com
          </p>
        </div>
      </section>
    </main>
  );
}
