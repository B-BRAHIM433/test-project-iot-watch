import React from 'react';
import ContactUsWidget from '../components/ContactUsWidget';
import Header from '../components/Header';

const ContactUsPage = () => {
  return (
    <div className="w-screen max-w-screen">
      <Header />
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <ContactUsWidget/>
      </main>
    </div>
  );
};

export default ContactUsPage;