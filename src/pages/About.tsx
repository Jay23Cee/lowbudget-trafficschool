import React from 'react';
import Image from 'next/image';

const About: React.FC = () => {
  // Single image and description for the About section
  const image = '/assets/welcome-to-lowbudgettraffic-school-header.png';
  const title = 'Welcome to Lowbudgettraffic school';
  const description = 'Your trusted ally in the journey towards affordable traffic education.';

  return (
    <div className="flex flex-col items-center px-5 py-8 text-center lg:px-20">
      {/* Welcome section with image */}
      <div className="lg:flex lg:justify-center lg:items-center">
        <div className="lg:w-1/2 lg:mr-10">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-semibold text-blue-800">{title}</h1>
          <p className="text-xl lg:text-2xl xl:text-3xl text-gray-700 my-6">{description}</p>
          <div className="hidden lg:block w-full p-4">
            <Image src={image} width={640} height={360} layout="responsive" alt="Traffic School" className="rounded-lg shadow-md"/>
          </div>
        </div>

        {/* Image for smaller screens */}
        <div className="lg:hidden w-full mb-6">
          <Image src={image} width={500} height={281} layout="responsive" alt="Traffic School" className="rounded-lg shadow-md"/>
        </div>
      </div>

      {/* Final paragraph */}
      <div className="max-w-2xl text-lg lg:text-xl xl:text-2xl text-gray-700">
        <p>Thank you for considering Lowbudgettraffic school as your gateway to affordable, high-quality traffic education. Drive safely, and let us guide you towards a brighter driving future.</p>
      </div>
    </div>
  );
};

export default About;
