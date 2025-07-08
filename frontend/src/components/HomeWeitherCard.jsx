import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cities from '../data/cities'; // ✅ Import de la liste réelle

function getRandomCityKey() {
    const keys = Object.keys(cities);
    return keys[Math.floor(Math.random() * keys.length)];
}

function HomeWeatherCard() {
    const [cityData, setCityData] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const randomKey = getRandomCityKey();
            const cityInfo = cities[randomKey];

            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${cityInfo.latitude}&longitude=${cityInfo.longitude}&current=temperature_2m,relative_humidity_2m`
                );
                const data = await response.json();

                if (data.current) {
                    setCityData({
                        name: cityInfo.name,
                        temperature: data.current.temperature_2m,
                        humidity: data.current.relative_humidity_2m
                    });
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données météo :", error);
            }
        };

        fetchWeather();
    }, []);

    return (
        <div className="w-screen max-w-screen min-h-screen">
            <section className="text-center max-w-2xl mx-auto mt-10 px-4">
                <h1 className="text-4xl font-extrabold mb-4 ">Welcome to Agri Watch 🌿</h1>
                <p className="text-lg text-gray-400">
                    Monitor real-time climate data to support your agricultural operations.
                    Stay informed about temperature and humidity levels across different Moroccan cities, so you can make smarter, weather-aware decisions for your crops and land.
                </p>
            </section>

            {cityData && (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 px-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition text-center">
                        <h3 className="text-xl font-semibold">🌡️ Temperature</h3>
                        <p className="text-3xl font-bold text-orange-500 mt-2">
                            {cityData.temperature?.toFixed(1)}°C
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">{cityData.name}</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition text-center">
                        <h3 className="text-xl font-semibold">💧 Humidity</h3>
                        <p className="text-3xl font-bold text-blue-500 mt-2">
                            {cityData.humidity}%
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">{cityData.name}</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition text-center">
                        <h3 className="text-xl font-semibold">📈 Predictions</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Voir l'évolution sur 7 jours
                        </p>
                        <Link
                            to="/tempPredictions"
                            className="text-green-500 font-semibold hover:underline mt-2 inline-block"
                        >
                            Explorer →
                        </Link>
                    </div>
                </section>
            )}

            <section className="mt-12 px-6">
                <img
                    src="https://i.pinimg.com/originals/a8/c9/4a/a8c94ae9cf744877eaad255a63014fb9.gif"
                    alt="Carte satellite du Maroc"
                    className="mx-auto rounded-xl shadow-lg w-full max-w-2xl"
                />
            </section>

            <div className="mt-12 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700 py-8">
                <div className="flex flex-col items-center justify-center text-center">

                    <img
                        src="https://www.agri40.ma/logo2.svg"
                        alt="Agri Watch Logo"
                        className="h-8 w-auto opacity-80 dark:opacity-70"
                    />
                   
                    <span className="text-lg font-medium text-gray-500 dark:text-gray-400">
                        © 2025 Agri Watch  {/* Author: Agri 4.0 [BAYCHOU BRAHIM]*/}
                    </span>
                </div>
                <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
                    Tous droits réservés
                </p>

            </div>


        </div>
    );
}

export default HomeWeatherCard;
