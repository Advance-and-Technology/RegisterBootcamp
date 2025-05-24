import React from 'react';
import { Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-at-dark border-b border-at-blue/20 py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 text-at-blue hover:text-at-blue-light transition-colors">
                    <Code2 className="h-8 w-8" />
                    <span className="text-xl font-bold">A&T</span>
                </Link>
                {/* <div>
                    <a
                        href="#"
                        className="px-4 py-2 rounded border border-at-blue text-at-blue hover:bg-at-blue hover:text-white transition-all"
                    >
                        Más Información
                    </a>
                </div> */}
            </div>
        </header>
    );
};

export default Header;