import React from 'react';

const Footer = ({ className }) => {
  const sections = [
    {
      title: 'Who We Serve',
      links: [
        { name: 'Single Site Dental Practices', url: '#' },
        { name: 'Multi-Site Dental Practices', url: '#' },
        { name: 'New Dental Practices', url: '#' }
      ]
    },
    {
      title: 'Dental Software',
      links: [
        { name: 'Features', url: '#' },
        { name: 'Reviews', url: '#' },
        { name: 'Onboarding', url: '#' },
        { name: 'FAQs', url: '#' },
        { name: 'Demo', url: '#' },
        { name: 'Login', url: '#' }
      ]
    },
    {
      title: 'Growth Solutions',
      links: [
        { name: 'CS Conversations™', url: '#' },
        { name: 'VirtualAssistant™', url: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', url: '#' },
        { name: 'Leadership Team', url: '#' },
        { name: 'Investors', url: '#' },
        { name: 'Press', url: '#' },
        { name: 'Careers', url: '#', special: "We're Hiring 🚀" },
        { name: 'Contact', url: '#' }
      ]
    }
  ];

  const features = [
    'Analytics & Reporting',
    'Appointment Reminders',
    'Backups',
    'Charting',
    'Clinical Notes',
    'Membership Plans',
    'UK GDPR-Compliance',
    'Online Forms',
    'Online Payments',
    'Curbside Check-In',
    'Patient Kiosk',
    'Patient Notifications',
    'Patient Portal',
    'Payment Plans',
    'Remote Access',
    'Scheduling',
    'Teledentistry',
    'Treatment Planning',
    'Payment Reminders'
  ];

  return (
    <footer className={`bg-gray-900 text-white pt-32 pb-12 ${className}`}>
      <div className="container mx-auto px-4 max-w-7xl flex flex-col gap-24">
        {/* Top Section */}
        <div>
        <div className="text-left mb-8 flex items-center justify-between md:flex-row flex-col">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Start using the best in class software</h2>
            <p className="text-gray-400 max-w-lg ">
              CareStack’s intuitive, modern User Interface is designed for easy learning. Our comprehensive learning center also streamlines onboarding, making the process easier for your team.
            </p>
          </div>
          <button className="mt-6 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Book Free Demo
          </button>
        </div>
        </div>


        {/* Footer Links Section */}
        <div className='flex flex-col gap-12'>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-sm">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="mb-2">
                    <a href={link.url} className="hover:text-gray-300">
                      {link.name} {link.special && <span className="text-green-400">{link.special}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className='flex flex-col gap-4'>
        <h3 className="text-lg font-semibold mb-4 text-white">{`Features`}</h3>
        <div className="grid grid-cols-2 gap-x-12 md:grid-cols-4  text-sm ">
          {features.map((feature, index) => (
            <div key={index} className={'pb-[11px]'}>
              <ul>
                <li className="">{feature}</li>
              </ul>
            </div>
          ))}
        </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div>
            <span>© 2017 - 2023 Good Methods Global Inc. All rights reserved.</span>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Terms of use', 'Privacy policy', 'Do not sell my information'].map((item, idx) => (
              <a href="#" key={idx} className="hover:text-white">
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-6 flex justify-center space-x-6 text-gray-500">
          {['linkedin', 'xing', 'facebook', 'instagram', 'youtube', 'vimeo'].map((platform, idx) => (
            <a key={idx} href="#" className="hover:text-white">
              <i className={`fab fa-${platform}`}></i>
            </a>
          ))}
        </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
