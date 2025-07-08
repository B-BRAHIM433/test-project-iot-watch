import React from 'react';
import Header from '../components/Header';
import TemperatureWidget from '../components/TemperatureWidget';

const Temperature = () => {
  return (
    <div className="w-screen max-w-screen min-h-screen bg-zinc-50 flex flex-col">
      <Header />
      <main className="container  px-4 py-8">
        <TemperatureWidget />
      </main>
    </div>
  );
};

export default Temperature;