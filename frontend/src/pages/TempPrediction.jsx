import React from 'react';
import Header from '../components/Header';
import TemperaturePrediction from '../components/TemperaturePrediction';

const TempPrediction = () => {
  return (
    <div className="w-screen max-w-screen min-h-screen bg-zinc-50 flex flex-col">
      <Header />
      <main className="container  px-25 py-8">
        <TemperaturePrediction/>
      </main>
    </div>
  );
};

export default TempPrediction;