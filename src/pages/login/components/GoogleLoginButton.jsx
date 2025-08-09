import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
// If you centralized endpoints:

// import { LoginRequestDTO } from "../dtos/LoginRequestDTO.ts"; // Adjust the import path as necessary

export default function GoogleLoginButton({ handleGoogleLogin }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSuccess = async (credentialResponse) => {
    setError("");
    setLoading(true);
    try {
      await handleGoogleLogin(credentialResponse);
    } catch (e) {
      console.log(e.message);
      setError(e.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleError = () => setError("Google login failed. Please try again.");

  return (
    <div className="flex flex-col items-center space-y-3">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded w-full text-center">
          {error}
        </div>
      )}
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />
      {loading && (
        <span className="text-sm text-gray-500">Signing you in…</span>
      )}
    </div>
  );
}
