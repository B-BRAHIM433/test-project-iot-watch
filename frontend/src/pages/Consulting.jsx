import React from 'react';
import ConsultingWidget from '../components/ConsultingWidget';
import Header from '../components/Header';

const ConsultingPage = () => {
  return (
    <div className="w-screen max-w-screen">
      <Header />
      <main className="auto-w-screen py-12 px-4 sm:px-6 lg:px-8">
        <ConsultingWidget />
      </main>
    </div>
  );
};

export default ConsultingPage;