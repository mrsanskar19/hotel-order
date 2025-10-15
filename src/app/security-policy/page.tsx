'use client';

export default function SecurityPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="w-full bg-[#FFF9E6] py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-gray-900 mb-6">
          Security Policy
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed">
          The security of your data is our top priority. This Security Policy outlines the 
          measures we take to protect your information.
        </p>
      </section>

      {/* Content Section */}
      <section className="container max-w-4xl mx-auto py-16 px-6 space-y-12">
        {/* 1. Data Encryption */}
        <div>
          <h2 className="text-2xl font-bold mb-4">1. Data Encryption</h2>
          <p className="text-gray-700 leading-relaxed">
            All data transmitted between your device and our servers is encrypted in transit 
            using Transport Layer Security (TLS). Data at rest is also encrypted using 
            industry-standard encryption algorithms.
          </p>
        </div>

        {/* 2. Access Control */}
        <div>
          <h2 className="text-2xl font-bold mb-4">2. Access Control</h2>
          <p className="text-gray-700 leading-relaxed">
            Access to your personal information is strictly limited to authorized personnel 
            who have a legitimate business need to access it. We enforce role-based 
            access control to ensure that employees only have access to the information 
            necessary to perform their job functions.
          </p>
        </div>

        {/* 3. Regular Security Audits */}
        <div>
          <h2 className="text-2xl font-bold mb-4">3. Regular Security Audits</h2>
          <p className="text-gray-700 leading-relaxed">
            We conduct regular security audits and vulnerability scanning to identify and 
            address potential security threats. Our security team is dedicated to 
            staying up-to-date with the latest security best practices.
          </p>
        </div>

        {/* 4. Incident Response */}
        <div>
          <h2 className="text-2xl font-bold mb-4">4. Incident Response</h2>
          <p className="text-gray-700 leading-relaxed">
            In the event of a security breach, we have a detailed incident response plan 
            in place to promptly contain, investigate, and mitigate the impact of the 
            incident. We will notify affected users as required by applicable laws.
          </p>
        </div>

        {/* 5. Contact Us */}
        <div>
          <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about our security practices, please contact us at:
          </p>
          <p className="mt-2 text-gray-700 font-semibold">
            📧 foodslinkX.com@gmail.com
          </p>
		  <p className="mt-2 text-gray-700 font-semibold">
            📧 foodslinkx@gmail.com
          </p>
        </div>
      </section>
    </main>
  );
}
