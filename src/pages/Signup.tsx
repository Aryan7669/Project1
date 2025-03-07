import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { UserPlus, Leaf,HeartHandshake } from "lucide-react";

const SignupPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState<"donor" | "recipient">("donor");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shakeRequired, setShakeRequired] = useState(false); // For animation trigger
  const [isFormVisible, setIsFormVisible] = useState(false); // For fade-in animation

  const { signup } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Check required fields
    if (!name.trim() || !email.trim() || !password.trim() || !address.trim() || !phone.trim() || !userType) {
      setShakeRequired(true);
      setTimeout(() => setShakeRequired(false), 500); // Reset shake after animation
      setError("Please fill out all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      const success = await signup(name, email, password, address, phone, userType);

      if (success) {
        navigate("/");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during signup.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger fade-in animation on mount
  useEffect(() => {
    setIsFormVisible(true);
  }, []);

  return (
    <div className={`max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 ${isFormVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}>
      <div className="p-6">
        <div className="flex justify-center mb-6 transition-all duration-500">
          <div className="bg-blue-100 p-3 rounded-full transition-all duration-500 animate-bounce-once">
            <HeartHandshake className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 transition-all duration-300 hover:text-gray-600">
          Sign up for Good2Give
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 transition-all duration-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2 transition-all duration-300 hover:text-gray-900">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500 ${shakeRequired && !name.trim() ? 'animate-shake' : ''}`}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2 transition-all duration-300 hover:text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500 ${shakeRequired && !email.trim() ? 'animate-shake' : ''}`}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2 transition-all duration-300 hover:text-gray-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500 ${shakeRequired && !password.trim() ? 'animate-shake' : ''}`}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-medium mb-2 transition-all duration-300 hover:text-gray-900">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500 ${shakeRequired && !address.trim() ? 'animate-shake' : ''}`}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2 transition-all duration-300 hover:text-gray-900">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500 ${shakeRequired && !phone.trim() ? 'animate-shake' : ''}`}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="userType" className="block text-gray-700 font-medium mb-2 transition-all duration-300 hover:text-gray-900">
              User Type
            </label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value as "donor" | "recipient")}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500 ${shakeRequired && !userType ? 'animate-shake' : ''}`}
              required
            >
              <option value="donor">Donor</option>
              <option value="recipient">Recipient</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Signing up...</span>
            ) : (
              <>
                <UserPlus className="h-5 w-5 mr-2" />
                <span>Sign Up</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 transition-all duration-300">
          <p className="text-center text-gray-600 transition-all duration-300 hover:text-gray-800">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 transition-colors duration-300">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;