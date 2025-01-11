import React from "react";
import Login from "../components/Auth/Login";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h1>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
