import "./App.css";
import React from 'react';
import AuthProvider from './Providers/AuthProvider';
import { AppRouter } from './Router/AppRouter';

export const App = () => {
    return (
        <div>
            <AuthProvider>
                < AppRouter />
            </AuthProvider>
        </div>
    )
}

