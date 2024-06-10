import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Audience from './components/Audience';
import Home from './components/Home'; // Import the Home component

const App = () => {
    const [isAuth, setAuth] = useState(false);

    const token = `Bearer ${localStorage.getItem('token')}`;

    return (
        <Router>
            <Routes>
                {!isAuth ? (
                    <Route path="/" element={<Auth setAuth={setAuth} />} />
                ) : (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/audience" element={<Audience token={token} />} />
                    </>
                )}
                {/* Redirect all other paths to home */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
