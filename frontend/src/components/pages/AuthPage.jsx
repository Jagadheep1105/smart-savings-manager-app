 
import React, { useState } from "react";
import { USER_TYPES } from "../../utils/constants";

const AuthPage = ({
  handleLogin,
  handleRegister,
  setError,
  setCurrentPage,
  error,
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [userType, setUserType] = useState(USER_TYPES[0]);
  const [salary, setSalary] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (isRegister) {
      if (role !== "user") {
        setError(
          'Registration is only for "user" role. Use the Login form for Admin/Financier.'
        );
        return;
      }
      handleRegister(username, password, userType, salary);
    } else {
      handleLogin(username, password, role);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl max-w-lg w-full transition duration-500">
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-2">
          {isRegister ? "New User Registration" : "Account Login"}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {isRegister ? "Start your financial journey today." : "Welcome back!"}
        </p>
        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150"
              required
            />
          </div>

          {!isRegister && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
              >
                <option value="user">User</option>
                <option value="admin">Admin (Tricky)</option>
                <option value="financier">Financier (Tricky)</option>
              </select>
              <p className="text-xs text-gray-400 mt-1">
                Tricky Logins: Admin=`admin_root`/`admin`;
                Financiers=`finan1`/`fin1`, `finan2`/`fin2`...
              </p>
            </div>
          )}

          {isRegister && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User Type
                </label>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                >
                  {USER_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() +
                        type.slice(1).replace("-", " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Monthly Salary ($)
                </label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value) || 0)}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  min="0"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-lg shadow-lg text-white font-semibold bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 transform hover:scale-[1.01]"
          >
            {isRegister ? "Register" : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isRegister ? "Already have an account? " : "Don't have an account? "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition duration-150"
          >
            {isRegister ? "Log In" : "Register Now"}
          </button>
        </p>
        <p className="mt-4 text-center text-sm text-gray-600">
          <button
            onClick={() => setCurrentPage("landing")}
            className="font-medium text-gray-500 hover:text-gray-700 hover:underline transition duration-150"
          >
            Back to Landing Page
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;