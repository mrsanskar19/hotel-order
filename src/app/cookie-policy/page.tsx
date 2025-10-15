'use client';

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="w-full bg-[#FFF9E6] py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-gray-900 mb-6">
          Cookie Policy
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed">
          This Cookie Policy explains how FoodsLinkX uses cookies and similar technologies to 
          recognize you when you visit our website.
        </p>
      </section>

      {/* Content Section */}
      <section className="container max-w-4xl mx-auto py-16 px-6 space-y-12">
        {/* 1. What Are Cookies */}
        <div>
          <h2 className="text-2xl font-bold mb-4">1. What Are Cookies?</h2>
          <p className="text-gray-700 leading-relaxed">
            Cookies are small data files that are placed on your computer or mobile device when 
            you visit a website. Cookies are widely used by website owners in order to make 
            their websites work, or to work more efficiently, as well as to provide 
            reporting information.
          </p>
        </div>

        {/* 2. Why We Use Cookies */}
        <div>
          <h2 className="text-2xl font-bold mb-4">2. Why We Use Cookies</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            We use cookies for several reasons. Some cookies are required for technical 
            reasons in order for our website to operate, and we refer to these as 
            "essential" or "strictly necessary" cookies. Other cookies also enable us to 
            track and target the interests of our users to enhance the experience on our 
            Online Properties. 
          </p>
        </div>

        {/* 3. Types of Cookies We Use */}
        <div>
          <h2 className="text-2xl font-bold mb-4">3. Types of Cookies We Use</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 leading-relaxed">
            <li><strong>Strictly Necessary Cookies:</strong> These cookies are essential to provide you with services available through our website and to enable you to use some of its features.</li>
            <li><strong>Performance and Functionality Cookies:</strong> These cookies are used to enhance the performance and functionality of our website but are non-essential to their use.</li>
            <li><strong>Analytics and Customization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are.</li>
          </ul>
        </div>

        {/* 4. How You Can Control Cookies */}
        <div>
          <h2 className="text-2xl font-bold mb-4">4. How You Can Control Cookies</h2>
          <p className="text-gray-700 leading-relaxed">
            You have the right to decide whether to accept or reject cookies. You can 
            exercise your cookie rights by setting your preferences in the Cookie 
            Consent Manager. The Cookie Consent Manager allows you to select which 
            categories of cookies you accept or reject. Essential cookies cannot be 
            rejected as they are strictly necessary to provide you with services.
          </p>
        </div>

        {/* 5. Contact Us */}
        <div>
          <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about our use of cookies or other technologies, 
            please email us at:
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
