import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
// If you centralized endpoints:
import { API, url } from "../../../config/config.ts";
// import { LoginRequestDTO } from "../dtos/LoginRequestDTO.ts"; // Adjust the import path as necessary

export default function GoogleLoginButton() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    setError("");
    setLoading(true);
    try {
      const idToken = credentialResponse.credential;
      console.log("Google ID Token:", idToken);
      console.log(
        "Google ID Token:",
        `${process.env.REACT_APP_API_BASE_URL}${API.auth.google}`
      );
      var loginRequestDTO = {
        loginType: "GOOGLE",
        idToken: idToken,
      };
      // If you have a central API config, use: fetch(url(API.auth.google), { ... })
      const res = await fetch(url(API.auth.login), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginRequestDTO),
      });
      console.log(res.text());

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        console.log(res);
        console.log(data.error);
        console.log(data.message);
        throw new Error(data.error || data.message || "Google login failed");
      }

      // Expecting { accessToken, expiresIn, tokenType } from backend
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/chat");
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
