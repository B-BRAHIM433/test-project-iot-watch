import { createContext, useContext, useState } from "react";

export const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [city, setCity] = useState("agadir");
  
  const cities = {
    agadir: {
      name: "Agadir",
      latitude: 30.4202,
      longitude: -9.5982,
    },
    ouarzazate: {
      name: "Ouarzazate",
      latitude: 30.9335,
      longitude: -6.9370,
    },
  };

  const toggleCity = () => {
    setCity(prev => prev === "agadir" ? "ouarzazate" : "agadir");
  };

  return (
    <CityContext.Provider value={{ city, cities, toggleCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => useContext(CityContext);