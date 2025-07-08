import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import cities from '../data/cities';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TemperaturePrediction = () => {
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(Object.keys(cities)[0]);
  const [forecastOption, setForecastOption] = useState('today');

  const forecastOptions = [
    { value: 'today', label: 'Today (remaining)' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'next3days', label: 'Next 3 Days' },
    { value: 'next7days', label: 'Next 7 Days' }
  ];

  const fetchPredictions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { latitude, longitude } = cities[selectedCity];
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=8`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.hourly || !data.hourly.time || !data.hourly.temperature_2m) {
        throw new Error('Invalid data format from API');
      }
      
      setPredictionData(data.hourly);
    } catch (err) {
      console.error("Error fetching predictions:", err);
      setError(err.message || "Failed to load predictions");
      setPredictionData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, [selectedCity]);

  const formatDate = (timestamp) => {
    try {
      const date = new Date(timestamp);
      if (forecastOption === 'today' || forecastOption === 'tomorrow') {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      } else {
        return date.toLocaleString([], { 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        });
      }
    } catch {
      return timestamp;
    }
  };

  const getFilteredData = () => {
    if (!predictionData) return { times: [], temps: [] };
    
    const now = new Date();
    const currentHour = now.getHours();
    const today = new Date(now.setHours(0, 0, 0, 0));
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    let startIndex = 0;
    let endIndex = predictionData.time.length;
    
    switch (forecastOption) {
      case 'today':
        // Reste du jour actuel
        startIndex = predictionData.time.findIndex(time => {
          return new Date(time) >= now;
        });
        endIndex = predictionData.time.findIndex(time => {
          return new Date(time) >= tomorrow;
        });
        break;
        
      case 'tomorrow':
        // Jour suivant complet (24h)
        startIndex = predictionData.time.findIndex(time => {
          return new Date(time) >= tomorrow;
        });
        endIndex = startIndex + 24;
        break;
        
      case 'next3days':
        // 3 jours complets à partir de demain
        startIndex = predictionData.time.findIndex(time => {
          return new Date(time) >= tomorrow;
        });
        endIndex = startIndex + (24 * 3);
        break;
        
      case 'next7days':
        // 7 jours complets à partir de demain
        startIndex = predictionData.time.findIndex(time => {
          return new Date(time) >= tomorrow;
        });
        endIndex = startIndex + (24 * 7);
        break;
    }
    
    endIndex = Math.min(endIndex, predictionData.time.length);
    return {
      times: predictionData.time.slice(startIndex, endIndex),
      temps: predictionData.temperature_2m.slice(startIndex, endIndex)
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#6b7280',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y}°C`,
          title: (tooltipItems) => {
            const date = new Date(tooltipItems[0].label);
            return isNaN(date) ? '' : date.toLocaleString();
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6b7280',
          maxRotation: 45,
          minRotation: 45,
          callback: (value) => formatDate(getFilteredData().times[value])
        }
      },
      y: {
        grid: {
          color: '#e5e7eb'
        },
        ticks: {
          color: '#6b7280',
          callback: (value) => `${value}°C`
        }
      }
    }
  };

  const getChartData = () => {
    const { times, temps } = getFilteredData();
    
    return {
      labels: times,
      datasets: [
        {
          label: `${cities[selectedCity].name} - ${forecastOptions.find(o => o.value === forecastOption).label}`,
          data: temps,
          borderColor: '#ff811f',
          backgroundColor: 'rgba(255, 129, 31, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointRadius: forecastOption === 'today' || forecastOption === 'tomorrow' ? 3 : 0,
          pointHoverRadius: forecastOption === 'today' || forecastOption === 'tomorrow' ? 5 : 0
        }
      ]
    };
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold">
            Temperature Prediction
          </h2>
          <p className="text-sm text-gray-500">
            {forecastOptions.find(o => o.value === forecastOption).label}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div >
            <label className="text-sm text-gray-500">City: </label>
            <select
            className=' bg-white text-sm px-3 py-1.5 dark:bg-gray-700 shadow-md rounded-md border border-gray-200 dark:border-gray-600 max-h-[300px] overflow-hidden'  
            value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {Object.keys(cities).map((key) => (
                <option key={key} value={key}>
                  {cities[key].name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">View:</label>
            <select
              className='w-full text-sm px-3 py-1.5 bg-white dark:bg-gray-700 shadow-md rounded-md border border-gray-200 dark:border-gray-600 max-h-[300px]'
              value={forecastOption}
              onChange={(e) => setForecastOption(e.target.value)}
            >
              {forecastOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading predictions...</p>
        </div>
      ) : error ? (
        <div className="h-64 flex flex-col items-center justify-center text-center p-4 gap-3">
          <div className="text-red-500 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
          <button
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center gap-2"
            onClick={fetchPredictions}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retry
          </button>
        </div>
      ) : (
        <div className="h-64">
          <Line 
            options={options} 
            data={getChartData()} 
            updateMode="resize"
          />
        </div>
      )}
    </div>
  );
};

export default TemperaturePrediction;