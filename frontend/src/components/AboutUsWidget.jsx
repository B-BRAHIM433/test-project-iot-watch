//The statistiques and the profiles that I used here aren't reall...

import React from 'react';
import { FiAward, FiGlobe, FiUsers } from 'react-icons/fi';

const AboutUsWidget = () => {
    const stats = [
        { value: '5+', label: 'Years Experience', icon: <FiAward className="text-3xl" /> },
        { value: '100+', label: 'Happy Clients', icon: <FiUsers className="text-3xl" /> },
        { value: '50+', label: 'Projects Completed', icon: <FiGlobe className="text-3xl" /> }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold sm:text-5xl">
                    About Agri4.0
                </h1>
                <p className="mt-6 text-xl max-w-3xl mx-auto">
                    Agriculture 4.0 is the evolution of precision agriculture and refers to all the actions implemented in modern farming.
                </p>
            </div>

            {/* Mission Section */}
            <div className=" rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">
                            Our Mission
                        </h2>
                        <p className="text-lg mb-6">
                            At AGRI 4.0, we are dedicated to researching solutions, designing and building electronic sensors, and developing web and mobile applications that enable smart farm management and the monitoring of all related equipment.
                            Our tools offer real-time tracking, monitoring, and analysis, making decision-making easier and enabling predictive management processes.
                            We are also active in the fields of Agri-food 4.0, Aquaculture 4.0, Smart Cities, Sustainability, Collaborative R&D, and Consulting & Support.
                        </p>
                        <a
                            href="https://www.agri40.ma/about"
                            target="_blank"
                        >
                            <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors">
                                Learn More
                            </button>
                        </a>

                    </div>
                    <div className="rounded-lg h-64 w-full overflow-hidden">
                        <img
                            src="https://www.agri40.ma/why.jpeg"
                            alt="Agri4.0 Work"
                            className="w-full h-full object-cover opacity-80 dark:opacity-70"
                        />
                    </div>

                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center"
                    >
                        <div className="text-green-500 dark:text-green-400 mb-4 flex justify-center">
                            {stat.icon}
                        </div>
                        <h3 className="text-4xl font-bold mb-2">
                            {stat.value}
                        </h3>
                        <p>
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Team Section */}
            <div className="rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <h2 className="text-3xl font-bold text-gray-500 mb-8 text-center">
                    Meet Our Team
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {[
                        { name: ' X Y ', role: 'Founder & CEO', bio: 'Agricultural engineer with 10+ years experience' },
                        { name: 'Y Z ', role: 'Lead Developer', bio: 'Full-stack developer specializing in climate data' },
                        { name: 'A B C ', role: 'IoT expert', bio: 'Iot excpert for predictive agriculture  models solutions' }
                    ].map((member, index) => (
                        <div key={index} className="text-center">
                            <div className="bg-gray-400 dark:bg-gray-700 rounded-full h-40 w-40 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                                <span>Photo</span>
                            </div>
                            <h3 className="text-xl font-semibold">
                                {member.name}
                            </h3>
                            <p className="text-green-500 dark:text-green-400 mb-2">
                                {member.role}
                            </p>
                            <p>
                                {member.bio}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUsWidget;