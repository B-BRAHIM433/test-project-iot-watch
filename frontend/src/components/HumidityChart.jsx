import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import {
  ChevronDownIcon,
  SearchIcon,
  XIcon
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

import cities from '../data/cities';

const getInitialDark = () => {
  if (localStorage.getItem("theme")) {
    return localStorage.getItem("theme") === "dark";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const HumidityChart = () => {
  const [humidityData, setHumidityData] = useState(null);
  const [isDark, setIsDark] = useState(getInitialDark());
  const [city, setCity] = useState("casablanca");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const sortedCities = Object.keys(cities)
    .sort((a, b) => cities[a].name.localeCompare(cities[b].name))
    .reduce((acc, key) => {
      acc[key] = cities[key];
      return acc;
    }, {});

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark"));
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const { latitude, longitude, name } = sortedCities[city];
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=relative_humidity_2m_max&timezone=auto&past_days=7`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.daily?.time && data.daily?.relative_humidity_2m_max) {
          const humidity = data.daily.relative_humidity_2m_max.slice(0, 7);
          const days = data.daily.time.slice(0, 7);

          setHumidityData({
            labels: days.map((day) =>
              new Date(day).toLocaleDateString("en-US", { weekday: "short" })
            ),
            datasets: [
              {
                label: `Humidity in ${name}`,
                data: humidity,
                borderColor: "#36A2EB",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                fill: true,
                borderWidth: 2,
                tension: 0.4,
              },
            ],
          });
        }
      })
      .catch(console.error);
  }, [city]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCities = Object.keys(sortedCities).filter(cityKey =>
    sortedCities[cityKey].name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: isDark ? "#f1f5f9" : "#1f2937",
        },
      },
    },
    scales: {
      x: {
        grid: { color: isDark ? "#333" : "#d1d5db" },
        ticks: { color: isDark ? "#f1f5f9" : "#374151" },
      },
      y: {
        grid: { color: isDark ? "#333" : "#d1d5db" },
        ticks: {
          color: isDark ? "#f1f5f9" : "#374151",
          callback: (value) => `${value}%`
        },
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.raw}%`
      }
    }
  };

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-4 lg:col-span-1 py-6 px-4 rounded-xl border-[0.5px] border-gray-300 dark:border-gray-600">
        <div className="flex justify-between items-start mb-4">
          <div className="text-left">
            <h2 className="text-xl font-medium dark:text-white">Humidity History in {sortedCities[city].name}</h2>
            <p className="font-light text-gray-400 dark:text-gray-300 text-sm">
              Last 7 days max humidity
            </p>
          </div>

          <div className="relative w-48 ml-4" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex justify-between items-center w-full px-3 py-1.5 text-sm text-left bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-xs hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="truncate">{sortedCities[city].name}</span>
              <ChevronDownIcon className="h-4 w-4 text-gray-500 ml-2" />
            </button>

            {dropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-md rounded-md border border-gray-200 dark:border-gray-600 max-h-[300px] overflow-hidden">
                <div className="sticky top-0 bg-white dark:bg-gray-700 p-2 border-b border-gray-100 dark:border-gray-600">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-9 pr-7 py-1.5 text-sm border-0 placeholder-gray-400 dark:placeholder-gray-300 focus:ring-0"
                    placeholder="Search city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-2 flex items-center"
                    >
                      <XIcon className="h-4 w-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-200" />
                    </button>
                  )}
                </div>

                <div className="overflow-y-auto max-h-[250px]">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((cityKey) => (
                      <button
                        key={cityKey}
                        onClick={() => {
                          setCity(cityKey);
                          setDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-600 ${city === cityKey
                          ? 'bg-gray-100 dark:bg-gray-600 font-medium text-gray-900 dark:text-white'
                          : 'text-gray-700 dark:text-gray-200'
                          }`}
                      >
                        {sortedCities[cityKey].name}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-300 text-center">
                      No cities found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full">
          {humidityData ? (
            <Line data={humidityData} options={options} className="min-h-[300px]" />
          ) : (
            <p className="dark:text-gray-300">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HumidityChart;