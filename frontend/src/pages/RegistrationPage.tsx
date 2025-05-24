import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ApplicantForm, FormErrors } from '../types/index';
import FormField from '../components/FormField';
import TextareaField from '../components/TextareaField';
import { calculateAge } from '../utils/helpers';
import axios from 'axios';


const RegistrationPage: React.FC = () => {

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<ApplicantForm>({
        name: '',
        identification: '',
        birth_date: '',
        address: '',
        email: '',
        phone_number: '',
        motivation: '',
        // age: undefined,
        name_guardian: '',
        identification_guardian: '',
        address_guardian: '',
        email_guardian: '',
        phone_number_guardian: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isMinor, setIsMinor] = useState(false);

    useEffect(() => {
        if (formData.birth_date) {
            const age = calculateAge(formData.birth_date);
            setFormData((prev) => ({ ...prev, age }));
            setIsMinor(age < 18);
        }
    }, [formData.birth_date]);

    const validateForm = () => {
        const newErrors: FormErrors = {};

        // Validate required fields
        if (!formData.name) newErrors.name = 'El nombre es obligatorio';
        if (!formData.identification) newErrors.identification = 'La identificación es obligatoria';
        if (!formData.birth_date) newErrors.birth_date = 'La fecha de nacimiento es obligatoria';
        if (!formData.address) newErrors.address = 'La dirección es obligatoria';
        if (!formData.email) newErrors.email = 'El correo electrónico es obligatorio';
        if (!formData.phone_number) newErrors.phone_number = 'El número de teléfono es obligatorio';
        if (!formData.motivation) newErrors.motivation = 'Este campo es obligatorio';

        // Email validation
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Por favor, introduce un correo electrónico válido';
        }

        // Guardian fields validation (only if applicant is a minor)
        if (isMinor) {
            if (!formData.name_guardian) newErrors.name_guardian = 'El nombre del acudiente es obligatorio para menores de edad';
            if (!formData.identification_guardian) newErrors.identification_guardian = 'La identificación del acudiente es obligatoria para menores de edad';
            if (!formData.address_guardian) newErrors.address_guardian = 'La dirección del acudiente es obligatoria para menores de edad';
            if (!formData.email_guardian) newErrors.email_guardian = 'El correo del acudiente es obligatorio para menores de edad';
            if (!formData.phone_number_guardian) newErrors.phone_number_guardian = 'El teléfono del acudiente es obligatorio para menores de edad';

            // Guardian email validation
            if (formData.email_guardian && !/\S+@\S+\.\S+/.test(formData.email_guardian)) {
                newErrors.email_guardian = 'Por favor, introduce un correo electrónico válido para el acudiente';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error when field is being edited
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        const cleanedData = {
            ...formData,
            name_guardian: formData.name_guardian || null,
            identification_guardian: formData.identification_guardian || null,
            address_guardian: formData.address_guardian || null,
            email_guardian: formData.email_guardian || null,
            phone_number_guardian: formData.phone_number_guardian || null,
        };
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', cleanedData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log('Response Backend:', response.data);
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log('Form data submitted:', formData);
            navigate('/thank-you');
        } catch (error: any) {
            console.error('Error submitting form:', error);
            if (error.response && error.response.data) {
                console.log('Detalles del error del backend:', error.response.data);
                setErrors((prev) => ({
                    ...prev,
                    ...error.response.data, // Esto asigna errores por campo si vienen así
                    form: 'Error al enviar el formulario.'
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    form: 'Error al enviar el formulario. Inténtalo de nuevo.'
                }));
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-10 md:py-16">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Bootcamp <span className="text-at-blue">FullStack A&T</span>
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Transforma tu futuro con nuestro programa intensivo de desarrollo web full stack.
                        ¡Regístrate ahora y da el primer paso hacia tu carrera en tecnología!
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-xl border border-at-blue/20 animate-slide-up">
                    <h2 className="text-2xl font-semibold mb-6 text-at-blue">Formulario de Registro</h2>

                    {errors.form && (
                        <div className="mb-6 p-4 bg-error/10 border border-error/30 rounded text-error">
                            {errors.form}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-xl font-medium text-gray-100">Información del Aspirante</h3>

                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField
                                    label="Nombre completo"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                    required
                                />

                                <FormField
                                    label="Número de identificación"
                                    type="text"
                                    name="identification"
                                    value={formData.identification}
                                    onChange={handleChange}
                                    error={errors.identification}
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField
                                    label="Fecha de nacimiento"
                                    type="date"
                                    name="birth_date"
                                    value={formData.birth_date}
                                    onChange={handleChange}
                                    error={errors.birth_date}
                                    required
                                />

                                <div className="relative">
                                    <FormField
                                        label="Edad"
                                        type="number"
                                        name="age"
                                        value={formData.age?.toString() || ''}
                                        onChange={() => { }}
                                        disabled
                                        className="bg-gray-800"
                                    />
                                    {isMinor && (
                                        <span className="absolute -top-1 -right-1 bg-warning text-black text-xs px-2 py-1 rounded-full">
                                            Menor de edad
                                        </span>
                                    )}
                                </div>
                            </div>

                            <FormField
                                label="Dirección"
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                error={errors.address}
                                required
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField
                                    label="Correo electrónico"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    required
                                />

                                <FormField
                                    label="Número de teléfono"
                                    type="tel"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    error={errors.phone_number}
                                    required
                                />
                            </div>

                            <TextareaField
                                label="¿Por qué quieres estar en el programa?"
                                name="motivation"
                                value={formData.motivation}
                                onChange={handleChange}
                                error={errors.motivation}
                                required
                                rows={4}
                            />
                        </div>

                        {isMinor && (
                            <div className="space-y-4 pt-4 border-t border-at-blue/20 animate-fade-in">
                                <h3 className="text-xl font-medium text-gray-100">Información del Acudiente</h3>
                                <p className="text-sm text-gray-300 italic">
                                    * Requerido para aspirantes menores de 18 años
                                </p>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormField
                                        label="Nombre del acudiente"
                                        type="text"
                                        name="name_guardian"
                                        value={formData.name_guardian || ''}
                                        onChange={handleChange}
                                        error={errors.name_guardian}
                                        required={isMinor}
                                    />

                                    <FormField
                                        label="Identificación del acudiente"
                                        type="text"
                                        name="identification_guardian"
                                        value={formData.identification_guardian || ''}
                                        onChange={handleChange}
                                        error={errors.identification_guardian}
                                        required={isMinor}
                                    />
                                </div>

                                <FormField
                                    label="Dirección del acudiente"
                                    type="text"
                                    name="address_guardian"
                                    value={formData.address_guardian || ''}
                                    onChange={handleChange}
                                    error={errors.address_guardian}
                                    required={isMinor}
                                />

                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormField
                                        label="Correo del acudiente"
                                        type="email"
                                        name="email_guardian"
                                        value={formData.email_guardian || ''}
                                        onChange={handleChange}
                                        error={errors.email_guardian}
                                        required={isMinor}
                                    />

                                    <FormField
                                        label="Teléfono del acudiente"
                                        type="tel"
                                        name="phone_number_guardian"
                                        value={formData.phone_number_guardian || ''}
                                        onChange={handleChange}
                                        error={errors.phone_number_guardian}
                                        required={isMinor}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 px-6 rounded font-medium transition-all focus:outline-none focus:ring-2 focus:ring-at-blue focus:ring-offset-2 focus:ring-offset-at-dark
                  ${isSubmitting
                                        ? 'bg-at-blue/50 cursor-not-allowed'
                                        : 'bg-at-blue hover:bg-at-blue-light text-white shadow-lg hover:shadow-at-blue/50'
                                    }`}
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;