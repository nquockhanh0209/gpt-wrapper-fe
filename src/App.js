// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID; // CRA
// or import.meta.env.VITE_GOOGLE_CLIENT_ID // Vite
function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
