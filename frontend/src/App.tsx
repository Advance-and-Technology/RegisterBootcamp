import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import RegistrationPage from './pages/RegistrationPage';
import ThankYouPage from './pages/ThankYouPage';

function App() {

    return (
        <div className="min-h-screen bg-at-dark text-white">
            <Header />
            <Routes>
                <Route path="/" element={<RegistrationPage />} />
                <Route path="/thank-you" element={<ThankYouPage />} />
            </Routes>
        </div>
    );
}

export default App;