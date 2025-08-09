import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import GoogleLoginButton from "./components/GoogleLoginButton.jsx";
import { API, url } from "../../config/config.ts";
import { LoginRequestDTO } from "../../dtos/LoginRequestDTO.ts"; // Adjust the import path as necessary
import { LoginType } from "../../dtos/enums/LoginType.ts"; // Adjust the import path as necessary

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onLoginRequestSent = async (res) => {
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.log(res);
      console.log(data.error);
      console.log(data.message);
      throw new Error(data.error || data.message || "Google login failed");
    }
    if (data.type === "Bearer") {
      const token = data.token;
      const userDTO = data.userDTO;
      localStorage.setItem("token", token);
      localStorage.setItem("username", userDTO.username);
      localStorage.setItem("email", userDTO.email);
      navigate("/team");
    }
  };

  const sendRequestLogin = async (loginRequestDTO) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    console.log(loginRequestDTO);

    const res = await fetch(url(API.auth.login), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginRequestDTO),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return res;
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      var loginRequestDTO = new LoginRequestDTO();
      loginRequestDTO.email = email;
      loginRequestDTO.password = password;
      loginRequestDTO.loginType = LoginType.EMAIL_PASSWORD;

      var res = await sendRequestLogin(loginRequestDTO);
      await onLoginRequestSent(res);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    const idToken = credentialResponse.credential;

    var loginRequestDTO = new LoginRequestDTO();
    loginRequestDTO.idToken = idToken;
    loginRequestDTO.loginType = LoginType.GOOGLE;

    var res = await sendRequestLogin(loginRequestDTO);

    await onLoginRequestSent(res);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome back</h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded hover:bg-gray-900"
          >
            Continue
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-2 text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <GoogleLoginButton handleGoogleLogin={handleGoogleLogin} />

        {/* 🔽 Register button here */}
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">Don’t have an account? </span>
          <Link
            to="/register"
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
