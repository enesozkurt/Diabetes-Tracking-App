import React, { useState } from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import MainNavigation from "./components/Navigation/MainNavigation";
import AuthContext from "./context/auth-context";

import AuthPage from "./pages/Auth";
import RecordsPage from "./pages/Records";

function App() {
    // Declare a new state variable,
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = (token, userId, tokenExpiration) => {
        setToken(token);
        setUserId(userId)
    }

    const logout = () => {
        setToken(null);
        setUserId(null)
    }

  return (
    <BrowserRouter>
        <AuthContext.Provider value={{token: token, userId: userId, login: login, logout: logout}}>
            {token && <MainNavigation />}
            <main className="main-content">
                <Routes>
                    {!token && <Route path="*" element={<Navigate replace to="/auth" />} />}
                    {token && <Route path="/auth" element={<Navigate replace to="/records" />} />}
                    {!token && <Route path="/auth" element={<AuthPage/>} />}
                    {token && <Route path="/records" element={<RecordsPage />} />}
                </Routes>
            </main>
        </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
