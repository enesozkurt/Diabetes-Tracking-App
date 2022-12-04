import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import MainNavigation from "./components/Navigation/MainNavigation";

import AuthPage from "./pages/Auth";
import RecordsPage from "./pages/Records";

function App() {
  return (
    <BrowserRouter>
        {/*<MainNavigation />*/}
        <main className="main-content">
            <Routes>
                <Route path="/" element={<Navigate replace to="/auth" />} />
                <Route path="/auth" element={<AuthPage/>} />
                <Route path="/records" element={<RecordsPage />} />
            </Routes>
        </main>
    </BrowserRouter>
  );
}

export default App;
