import React from 'react';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';

const ContactUsWidget = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitStatus, setSubmitStatus] = React.useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Simulation d'envoi
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold sm:text-4xl">
                    Contact Us
                </h1>
                <p className="mt-3 text-xl text-gray-500">
                    We would love to hear from you
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Section des info, vous pouvez ajouter votre numero correcte de telephone */}
                <div className="space-y-8">
                    <div className="p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-2xl font-semibold  mb-6">
                            Our Contact Information
                        </h2>

                        <div className="space-y-4" >
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-orange-100 rounded-lg text-orange-500">
                                    <FiMail className="h-6 w-6" />
                                </div>

                                <h3 className="text-lg font-medium">Email:</h3>
                                <p className="text-gray-500 ">contact@agri40.ma</p>

                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-green-100 rounded-lg text-green-500">
                                    <FiPhone className="h-6 w-6" />
                                </div>

                                <h3 className="text-lg font-medium">Phone:</h3>
                                <p className="text-gray-500 ">+212 ...</p>

                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-500">
                                    <FiMapPin className="h-6 w-6" />
                                </div>

                                <h3 className="text-lg font-medium">Adresse:</h3>
                                <p className="text-gray-500">
                                N°8 Rue Nissrine, Cité Ryad Salam, Agadir, 80000, Morocco<br />
                                    Maroc
                                </p>

                            </div>
                        </div>
                    </div>

                    {/* Heure d'ouverture vous pouvez le s'adapter selon votre crpnaux */}
                    <div className="p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-semibold">
                            Opening Hours
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span>Monday – Friday</span>
                                <span className="font-medium text-gray-500">9:00 AM – 17:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Saturday-Sunday</span>
                                <span className="font-medium text-gray-500">Closed</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Formulaire Pour envoyer un msg, Personnalisez le contact selon vos besoins*/}
                <div className="p-6 rounded-xl shadow-sm border">
                    <h2 className="text-2xl font-semibold mb-6">
                        Send Us a Message
                    </h2>

                    {submitStatus === 'success' ? (
                        <div className="p-4 mb-6 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg">
                            Thank you ! Your message was sent successfully.
                        </div>
                    ) : submitStatus === 'error' ? (
                        <div className="p-4 mb-6 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
                            Error! Please try again.
                        </div>
                    ) : null}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-500 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-400  rounded-lg"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                            ></textarea>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center justify-center w-full px-6 py-3 bg-green-600 hover:bg-green-800 text-white font-medium rounded-lg transition-colors disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <span>Sending...</span>
                                ) : (
                                    <>
                                        <FiSend className="mr-2" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUsWidget;