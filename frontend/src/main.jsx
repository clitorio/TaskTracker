import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from './App';
import ProtectedRoute from './components/protected-route';
import Login from './auth/login';
import { AuthProvider } from './lib/auth-provider';

const router = createBrowserRouter([
    {
        path: "login",
        Component: Login
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <App />
            </ProtectedRoute>
        )
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        
        <AuthProvider>
            {/* <App /> */}
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>,
)
