import React from 'react';
import AboutUsWidget from '../components/AboutUsWidget';
import Header from '../components/Header';

const AboutUsPage = () => {
  return (
    <div className="w-screen max-w-screen">
      <Header />
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <AboutUsWidget />
      </main>
    </div>
  );
};

export default AboutUsPage;