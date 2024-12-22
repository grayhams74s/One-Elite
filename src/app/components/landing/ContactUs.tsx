import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-black/50 flex items-center justify-center text-center">
        <div className="space-y-4">
          <h2 className="text-red-600 text-3xl font-bold">WE ARE HERE TO SERVE YOU</h2>
          <h1 className="text-6xl font-bold">CONTACT US!</h1>
          <p className="max-w-3xl mx-auto px-4">
            At 1 Elite Automotive, where quality and customer satisfaction are our top priorities, we go the extra mile to ensure your vehicle receives the best care. Whether you need a simple service or comprehensive diagnosis, were committed to delivering exceptional service every time. Reach out to uswell give our full 110% to prove it!
          </p>
        </div>
      </div>

      {/* Hours Section */}
      <div className="bg-black py-8 text-center">
        <h3 className="text-2xl font-bold mb-2">Open Daily from</h3>
        <p className="text-xl">8:00 am - 5:00 pm</p>
      </div>

      {/* Contact Info Section */}
      <div className="bg-black/90 py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-red-600">CONTACT 1 ELITE AUTOMOTIVE</h3>
            <p className="text-lg">
              Were here to help! At 1 Elite Automotive, we value your feedback and inquiries. Whether you have questions about our services or would like to schedule an appointment, our dedicated team is ready to assist you.
            </p>
            <p className="text-lg">
              Feel free to reach out to us by phone, email, or by visiting our location at 0028 Taft Don Mariano Marcos Ave., Commonwealth Extension Fairview, Quezon City. Your satisfaction is our top priority, and we strive to provide prompt responses to all your needs.
            </p>
            <p className="text-lg">
              We look forward to hearing from you and helping you with all your automotive needs!
            </p>
          </div>
          
          {/* Right Column - Map */}
          <div className="h-[400px] bg-black">
            {/* Replace with actual map implementation */}
            <div className="w-full h-full flex items-center justify-center">

            <div className="h-[300px] md:w-[500px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.0447902550344!2d121.0729!3d14.6901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQxJzI0LjQiTiAxMjHCsDA0JzIyLjQiRQ!5e0!3m2!1sen!2sph!4v1635134844559!5m2!1sen!2sph"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          ></iframe>
        </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Contact */}
      <div className="bg-black py-8 text-center">
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto">
            <p>1ELITE AUTOMOTIVE</p>
          </div>
          <p className="text-xl font-bold">
            CALL US 0949 954 0501 OR VISIT OUR FACEBOOK PAGE: 1 ELITE AUTOMOTIVE
          </p>
          <div className="flex justify-center gap-4 text-red-600">
            <button className="hover:underline">SCHEDULE AN APPOINTMENT</button>
            <span>|</span>
            <button className="hover:underline">SERVICES</button>
            <span>|</span>
            <button className="hover:underline">PRIVACY POLICY</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;