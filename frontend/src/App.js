import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import AuthPage from "./pages/Auth";
import RecordsPage from "./pages/Records";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate replace to="/auth" />} />
            <Route path="/auth" element={<AuthPage/>} />
            <Route path="/records" element={<RecordsPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
