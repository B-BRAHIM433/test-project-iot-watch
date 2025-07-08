import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from 'chart.js';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  SearchIcon,
  ThermometerIcon,
  XIcon
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import cities from '../data/cities'; // ⬅️ Import de la liste partagée

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const TemperatureWidget = () => {
  const [city, setCity] = useState('casablanca');
  const [currentTemp, setCurrentTemp] = useState(null);
  const [previousTemps, setPreviousTemps] = useState([]);
  const [time, setTime] = useState('--:--');
  const [trend, setTrend] = useState('stable');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const calculateTrend = (temps) => {
    if (temps.length < 2) return 'stable';
    const diff = temps[temps.length - 1] - temps[temps.length - 2];
    if (diff > 0.5) return 'rising';
    if (diff < -0.5) return 'falling';
    return 'stable';
  };

  useEffect(() => {
    const fetchCurrentTemp = async () => {
      try {
        const { latitude, longitude } = cities[city];
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
        );
        const data = await response.json();
        if (data.current?.temperature_2m !== undefined) {
          const newTemp = data.current.temperature_2m;
          setCurrentTemp(newTemp);
          setTime(new Date().toLocaleTimeString());
          setPreviousTemps(prev => [...prev.slice(-2), newTemp]);
        }
      } catch (error) {
        console.error("Error fetching temperature:", error);
      }
    };

    const interval = setInterval(fetchCurrentTemp, 3600000); // every hour
    fetchCurrentTemp();
    return () => clearInterval(interval);
  }, [city]);

  useEffect(() => {
    if (previousTemps.length >= 2) {
      setTrend(calculateTrend(previousTemps));
    }
  }, [previousTemps]);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const { latitude, longitude, name } = cities[city];
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&timezone=auto&past_days=7`
        );
        const data = await response.json();
        if (data.daily) {
          setChartData({
            labels: data.daily.time.map(day =>
              new Date(day).toLocaleDateString('en-US', { weekday: 'short' })
            ),
            datasets: [{
              label: `Temperature in ${name}`,
              data: data.daily.temperature_2m_max,
              borderColor: '#f97316',
              backgroundColor: 'rgba(249, 115, 22, 0.2)',
              tension: 0.4
            }]
          });
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [city]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCities = Object.keys(cities).filter(cityKey =>
    cities[cityKey].name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden w-full max-w-6xl mx-auto">
      <div className="p-8 border-b dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-6 w-full md:w-auto">
          <ThermometerIcon className="h-12 w-12 text-red-500 dark:text-red-400" />
          <div className="flex-1">
            <h3 className="text-2xl font-semibold dark:text-white">Current Temperature</h3>
            <div className="flex items-end space-x-2">
              <span className="text-5xl font-bold dark:text-white">
                {currentTemp !== null ? currentTemp.toFixed(1) : '--'}°C
              </span>
              <span className="text-xl text-gray-500 pb-1">
                in {cities[city].name}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          {trend !== 'stable' && previousTemps.length >= 2 && (
            <div className={`flex items-center px-4 py-2 rounded-lg ${
              trend === 'rising'
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            }`}>
              {trend === 'rising' ? (
                <ArrowUpIcon className="h-5 w-5 mr-2" />
              ) : (
                <ArrowDownIcon className="h-5 w-5 mr-2" />
              )}
              <span>
                {trend === 'rising' ? 'Rising' : 'Falling'} (
                {Math.abs(currentTemp - previousTemps[previousTemps.length - 2]).toFixed(1)}°C)
              </span>
            </div>
          )}

          <div className="relative w-full md:w-64" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex justify-between items-center w-full px-4 py-2 text-left bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-gray500">{cities[city].name}</span>
              <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg rounded-lg border border-gray-200 dark:border-gray-600 max-h-96 overflow-hidden">
                <div className="relative p-2 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-10 py-2 border-0 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:ring-0 sm:text-sm"
                    placeholder="Search city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <XIcon className="h-5 w-5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-200" />
                    </button>
                  )}
                </div>

                <div className="max-h-60 overflow-y-auto bg-white dark:bg-gray-700">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((cityKey) => (
                      <button
                        key={cityKey}
                        onClick={() => {
                          setCity(cityKey);
                          setDropdownOpen(false);
                          setSearchTerm('');
                        }}
                        className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                          city === cityKey
                            ? 'bg-gray-100 dark:bg-gray-600 font-medium text-gray-900 dark:text-white'
                            : 'text-gray-700 dark:text-gray-200'
                        }`}
                      >
                        {cities[cityKey].name}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500 dark:text-gray-300 text-center">
                      No cities found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="text-lg text-gray-600 dark:text-gray-300">
            Updated: {time}
          </div>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-semibold dark:text-white mb-6">
          7-Day Temperature Forecast
        </h3>

        <div className="h-96 w-full">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-lg text-gray-600 dark:text-gray-300">Loading chart data...</p>
            </div>
          ) : chartData ? (
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    labels: {
                      font: { size: 14 },
                      color: '#4b5563'
                    }
                  }
                },
                scales: {
                  x: {
                    grid: { color: '#e5e7eb' },
                    ticks: { color: '#4b5563', font: { size: 14 } }
                  },
                  y: {
                    grid: { color: '#e5e7eb' },
                    ticks: { color: '#4b5563', font: { size: 14 } }
                  }
                }
              }}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-lg text-gray-600 dark:text-gray-300">No data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemperatureWidget;
