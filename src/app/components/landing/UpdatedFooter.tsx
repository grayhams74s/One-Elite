import React from 'react';

const UpdatedFooter = () => {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="space-y-8">
          <div>
            <h2 className="text-red-600 font-bold mb-2">ABOUT US</h2>
            <p className="text-sm leading-relaxed">
              Located at Blk 11 Don Mariano Marcos Ave, Commonwealth Extension, Fairview, Quezon City, 1 Elite Automotive provides top-quality auto services to car owners across the area. We proudly serve Fairview and surrounding communities with expert detailing, maintenance, and repair services. In a location where cars are common, you can trust that the skilled team at 1 Elite Automotive is ready to meet all your car care needs with professionalism and precision.
            </p>
          </div>

          <div>
            <h2 className="text-red-600 font-bold mb-2">CALL US</h2>
            <p className="text-sm">0949 954 0501</p>
          </div>

          <div>
            <h2 className="text-red-600 font-bold mb-2">VISIT US</h2>
            <p className="text-sm">Hours: Open Daily from 8:00am to 9:00pm</p>
            <p className="text-sm">Maps: 1 Elite Automotive Inc.</p>
          </div>

          <div>
            <h2 className="text-red-600 font-bold mb-2">FACEBOOK PAGE</h2>
            <p className="text-sm">1 ELITE Automotive</p>
          </div>

          <div className="text-sm">
            <a href="#" className="text-white hover:text-red-400">SCHEDULE AN APPOINTMENT</a>
            {" | "}
            <a href="#" className="text-white hover:text-red-400">SERVICES</a>
            {" | "}
            <a href="#" className="text-white hover:text-red-400">PRIVACY POLICY</a>
          </div>
        </div>

        {/* Right Section - Map */}
        <div className="h-[300px] md:h-full">
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
    </footer>
  );
};

export default UpdatedFooter;