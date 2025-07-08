import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';

/*Pages */
import AboutUsPage from './pages/AboutUs';
// import ConsultingPage from './pages/ConsultingPage';
import ContactUs from './pages/ContactUs';
import Home from './pages/Home';
import Humidity from './pages/Humidity';
import Temperature from "./pages/Temperature";
import TempPrediction from './pages/TempPrediction';
import Consulting from './pages/Consulting'



function App() {

  return (


    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/temperature" element={<Temperature />} />
      <Route path="/humidity" element={<Humidity />} />
      <Route path='/tempPredictions' element={<TempPrediction />} />
      <Route path='/contactUs' element={<ContactUs />} />
      <Route path='/aboutUs' element={<AboutUsPage />} />
      <Route path='/consulting' element={<Consulting />} />
    </Routes>


  )
}

export default App;
