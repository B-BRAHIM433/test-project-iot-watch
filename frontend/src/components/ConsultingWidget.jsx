import React, { useEffect, useState } from 'react';
import { FiAlertTriangle, FiCalendar, FiCheckCircle, FiCloudRain, FiDroplet, FiSun } from 'react-icons/fi';

const ConsultingWidget = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        cropType: 'Olive Trees',
        growthStage: 'vegetative',
        soilType: 'clay',
        irrigationMethod: 'drip',
        concerns: [],
        consultType: 'quick',
        contactMethod: 'none',
        contactInfo: ''
    });
    const [randomTip, setRandomTip] = useState('');

    // Liste de conseils agricoles (pour test)
    const farmingTips = [
        "Water your crops early in the morning to reduce evaporation",
        "Rotate crops annually to prevent soil depletion",
        "Add compost to improve soil fertility naturally",
        "Monitor for pests weekly during growing season",
        "Use mulch to retain soil moisture and suppress weeds",
        "Test soil pH annually for optimal nutrient availability",
        "Prune fruit trees in late winter for better yields",
        "Space plants properly to improve air circulation",
        "Apply organic fertilizers during the growing season",
        "Install bird nets to protect fruits from birds"
    ];

    // Sélectionner un conseil aléatoire au chargement
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * farmingTips.length);
        setRandomTip(farmingTips[randomIndex]);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        localStorage.setItem("agri-consult-data", JSON.stringify(formData));
        console.log('Submission data:', formData);
    };

    const toggleConcern = (concern) => {
        setFormData(prev => ({
            ...prev,
            concerns: prev.concerns.includes(concern)
                ? prev.concerns.filter(c => c !== concern)
                : [...prev.concerns, concern]
        }));
    };

    // Options data
    const cropOptions = ['Olive Trees', 'Citrus Fruits', 'Grapes', 'Wheat', 'Corn', 'Vegetables', 'Berries', 'Other'];
    
    const growthStages = [
        { value: 'seedling', label: 'Seedling' },
        { value: 'vegetative', label: 'Vegetative Growth' },
        { value: 'flowering', label: 'Flowering' },
        { value: 'fruiting', label: 'Fruiting' },
        { value: 'harvest', label: 'Harvest' }
    ];
    
    const soilTypes = [
        { value: 'sandy', label: 'Sandy' },
        { value: 'clay', label: 'Clay' },
        { value: 'loam', label: 'Loam' },
        { value: 'silt', label: 'Silt' },
        { value: 'peat', label: 'Peat' }
    ];
    
    const irrigationMethods = [
        { value: 'drip', label: 'Drip Irrigation', icon: <FiDroplet className="inline mr-1" /> },
        { value: 'sprinkler', label: 'Sprinkler', icon: <FiCloudRain className="inline mr-1" /> },
        { value: 'flood', label: 'Flood', icon: <FiDroplet className="inline mr-1" /> },
        { value: 'manual', label: 'Manual', icon: <FiDroplet className="inline mr-1" /> }
    ];
    
    const commonConcerns = [
        { id: 'drought', label: 'Drought Stress', icon: <FiSun className="inline mr-1" /> },
        { id: 'excess_rain', label: 'Excess Rain', icon: <FiCloudRain className="inline mr-1" /> },
        { id: 'pests', label: 'Pest Infestation', icon: <FiAlertTriangle className="inline mr-1" /> },
        { id: 'diseases', label: 'Diseases', icon: <FiAlertTriangle className="inline mr-1" /> },
        { id: 'nutrient_def', label: 'Nutrient Deficiency', icon: <FiAlertTriangle className="inline mr-1" /> },
        { id: 'frost', label: 'Frost Damage', icon: <FiAlertTriangle className="inline mr-1" /> },
        { id: 'weeds', label: 'Weed Pressure', icon: <FiAlertTriangle className="inline mr-1" /> },
        { id: 'other', label: 'Other Issues', icon: <FiAlertTriangle className="inline mr-1" /> }
    ];
    
    const contactMethods = [
        { value: 'none', label: 'No response needed' },
        { value: 'email', label: 'Email me the recommendations' },
        { value: 'sms', label: 'Text me the summary' },
        { value: 'whatsapp', label: 'WhatsApp message' }
    ];

    return (
        <div className="max-auto rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                <h2 className="text-2xl font-bold">Free Agricultural Consultation</h2>
                <p className="mt-1 opacity-90">Get expert farming advice instantly - no account needed</p>
            </div>

            {/* Main Content */}
            <div className="p-6">
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="p-4 rounded-lg">
                            <h3 className="font-semibold">
                                <FiCheckCircle className="inline mr-2" />
                                Personalized Farming Advice
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Complete this form to receive customized recommendations
                            </p>
                        </div>

                        {/* Crop Information Section */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-2">
                                    Crop Type *
                                </label>
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                                    value={formData.cropType}
                                    onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                                    required
                                >
                                    {cropOptions.map((crop, index) => (
                                        <option key={index} value={crop}>{crop}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-2">
                                    Growth Stage *
                                </label>
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                                    value={formData.growthStage}
                                    onChange={(e) => setFormData({ ...formData, growthStage: e.target.value })}
                                    required
                                >
                                    {growthStages.map((stage, index) => (
                                        <option key={index} value={stage.value}>{stage.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Soil and Irrigation Section */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-2">
                                    Soil Type *
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {soilTypes.map((soil) => (
                                        <label key={soil.value} className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="soilType"
                                                className="text-green-600"
                                                checked={formData.soilType === soil.value}
                                                onChange={() => setFormData({ ...formData, soilType: soil.value })}
                                                required
                                            />
                                            <span>{soil.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-2">
                                    Irrigation Method *
                                </label>
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                                    value={formData.irrigationMethod}
                                    onChange={(e) => setFormData({ ...formData, irrigationMethod: e.target.value })}
                                    required
                                >
                                    {irrigationMethods.map((method, index) => (
                                        <option key={index} value={method.value}>
                                            {method.icon} {method.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Concerns Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">
                                Current Concerns (Select all that apply)
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {commonConcerns.map((concern) => (
                                    <label key={concern.id} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            className="rounded text-green-600"
                                            checked={formData.concerns.includes(concern.id)}
                                            onChange={() => toggleConcern(concern.id)}
                                        />
                                        <span className="text-sm">
                                            {concern.icon} {concern.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Contact Method Section */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    How would you like to receive recommendations?
                                </label>
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                                    value={formData.contactMethod}
                                    onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                                >
                                    {contactMethods.map((method, index) => (
                                        <option key={index} value={method.value}>{method.label}</option>
                                    ))}
                                </select>
                            </div>

                            {formData.contactMethod !== 'none' && (
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        {formData.contactMethod === 'email' ? 'Email Address' :
                                         formData.contactMethod === 'sms' ? 'Phone Number' : 
                                         'WhatsApp Number'} *
                                    </label>
                                    <input
                                        type={formData.contactMethod === 'email' ? 'email' : 'tel'}
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        placeholder={
                                            formData.contactMethod === 'email' ? 'example@gmail.com' :
                                            '+212 640479708'
                                        }
                                        value={formData.contactInfo}
                                        onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                                        required
                                    />
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors mt-4"
                        >
                            Get Personalized Recommendations
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-14">
                        <FiCheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
                        <h3 className="text-xl font-medium mb-2">
                            Thank You for Your Submission!
                        </h3>
                        <p className="mb-6">
                            {formData.contactMethod !== 'none'
                                ? `We will send your recommendations to ${formData.contactInfo} shortly.`
                                : 'Your recommendations will be displayed here when ready.'}
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition"
                        >
                            New Consultation
                        </button>
                    </div>
                )}
            </div>

            {/* Today's Farming Tip , it change automatically randomly*/}
            <div className="p-5 border-t border-gray-200">
                <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 p-2 rounded-lg text-green-600">
                        <FiCalendar className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium">
                            Today's Farming Tip
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}: {randomTip}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultingWidget;