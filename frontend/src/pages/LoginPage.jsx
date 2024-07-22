import { Link } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations/user.mutation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [login, { loading }] = useMutation(LOGIN, {
    refetchQueries: ['GetAuthenticatedUser']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      return toast.error("Please fill in all fields");
    }
    try {
      await login({
        variables: {
          input: loginData
        }
      });
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left side with image and animated text */}
      <div className="relative w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url("/path/to/your/image.jpg")' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-4xl font-bold mb-4 animate-slide">Manage Your Finances</h1>
            <p className="text-lg animate-slide">Track your expenses, set budgets, and gain insights into your financial health.</p>
          </div>
        </div>
      </div>

      {/* Right side with dark form */}
      <div className="w-1/2 flex justify-center items-center bg-black">
        <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-6 text-white text-center">Login</h1>
          <h2 className="text-sm font-semibold mb-6 text-gray-400 text-center">
            Welcome back! Log in to your account
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField
              label="Username"
              id="username"
              name="username"
              value={loginData.username}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              id="password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChange}
            />
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-400 text-center">
            <p>
              {"Don't"} have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
