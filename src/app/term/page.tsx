'use client';

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="w-full bg-[#FFF9E6] py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-gray-900 mb-6">
          Terms of Service
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed">
          Please read these Terms of Service carefully before using the FoodsLinkX platform.
        </p>
      </section>

      {/* Content Section */}
      <section className="container max-w-4xl mx-auto py-16 px-6 space-y-12">
        {/* 1. Acceptance of Terms */}
        <div>
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using our service, you agree to be bound by these terms. If you 
            disagree with any part of the terms, then you may not access the service.
          </p>
        </div>

        {/* 2. Use of Service */}
        <div>
          <h2 className="text-2xl font-bold mb-4">2. Use of Service</h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to use the FoodsLinkX platform only for lawful purposes and in a way 
            that does not infringe the rights of, restrict, or inhibit anyone else's use 
            and enjoyment of the platform. Prohibited behavior includes harassing or 
            causing distress or inconvenience to any other user, transmitting obscene 
            or offensive content, or disrupting the normal flow of dialogue within our 
            platform.
          </p>
        </div>

        {/* 3. Accounts */}
        <div>
          <h2 className="text-2xl font-bold mb-4">3. Accounts</h2>
          <p className="text-gray-700 leading-relaxed">
            When you create an account with us, you must provide us with information that 
            is accurate, complete, and current at all times. Failure to do so constitutes 
            a breach of the Terms, which may result in immediate termination of your 
            account on our service.
          </p>
        </div>

        {/* 4. Intellectual Property */}
        <div>
          <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed">
            The Service and its original content, features, and functionality are and will 
            remain the exclusive property of FoodsLinkX and its licensors. Our trademarks 
            and trade dress may not be used in connection with any product or service 
            without the prior written consent of FoodsLinkX.
          </p>
        </div>

        {/* 5. Termination */}
        <div>
          <h2 className="text-2xl font-bold mb-4">5. Termination</h2>
          <p className="text-gray-700 leading-relaxed">
            We may terminate or suspend your account immediately, without prior notice or 
            liability, for any reason whatsoever, including without limitation if you 
            breach the Terms.
          </p>
        </div>

        {/* 6. Governing Law */}
        <div>
          <h2 className="text-2xl font-bold mb-4">6. Governing Law</h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms shall be governed and construed in accordance with the laws of our 
            jurisdiction, without regard to its conflict of law provisions.
          </p>
        </div>

        {/* 7. Contact Us */}
        <div>
          <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about these Terms, please contact us at:
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
