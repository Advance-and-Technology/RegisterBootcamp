import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const ThankYouPage: React.FC = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Trigger animation after component mount
        setAnimate(true);
    }, []);

    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-2xl mx-auto text-center">
                <div className={`transition-all duration-700 ease-out ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}>
                    <div className="flex justify-center mb-8">
                        <CheckCircle className="w-24 h-24 text-success" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        ¡Gracias por registrarte!
                    </h1>

                    <p className="text-xl text-gray-300 mb-8">
                        Tu solicitud ha sido recibida con éxito. Estamos muy emocionados de que quieras ser parte
                        del <span className="text-at-blue font-medium">Bootcamp FullStack A&T</span>.
                        Muy pronto nos pondremos en contacto contigo para los siguientes pasos.
                    </p>

                    <p className="text-gray-400 mb-12">
                        Prepárate para comenzar un viaje de aprendizaje que transformará tu futuro profesional.
                        ¡Juntos construiremos las bases para tu carrera en tecnología!
                    </p>

                    <div className="animate-bounce">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-at-blue hover:text-at-blue-light transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Volver al formulario</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYouPage;