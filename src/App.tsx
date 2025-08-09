// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPage from "./pages/login/LoginPage.tsx";
import ChatPage from "./pages/chat/ChatPage.tsx";
import TeamManagementPage from "./pages/team/TeamManagementPage.tsx";
import ProtectedRoute from "./middleware/ProtectedRoute.tsx"
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID; // CRA
// or import.meta.env.VITE_GOOGLE_CLIENT_ID // Vite
function App() {
  return (
    <GoogleOAuthProvider clientId={clientId || ""}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* Protected routes group */}
          <Route element={<ProtectedRoute />}>
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/team" element={<TeamManagementPage />} />
          </Route>
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
