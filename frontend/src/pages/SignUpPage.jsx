import { useState } from "react";
import { Link } from "react-router-dom";
import RadioButton from "../components/RadioButton";
import InputField from "../components/InputField";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { SIGN_UP } from "../graphql/mutations/user.mutation";

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "",
  });

  const [signup, { loading }] = useMutation(SIGN_UP, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({
        variables: {
          input: signUpData,
        },
      });
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setSignUpData((prevData) => ({
        ...prevData,
        gender: value,
      }));
    } else {
      setSignUpData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left side with image and animated text */}
      <div
        className="relative w-1/2 bg-cover bg-center"
        style={{ backgroundImage: 'url("/path/to/your/image.jpg")' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-4xl font-bold mb-4 animate-slide">Join Us Today</h1>
            <p className="text-lg animate-slide">
              Create an account to manage your expenses and achieve financial goals.
            </p>
          </div>
        </div>
      </div>

      {/* Right side with dark form */}
      <div className="w-1/2 flex justify-center items-center bg-gray-900">
        <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-6 text-white text-center">Sign Up</h1>
          <h2 className="text-sm font-semibold mb-6 text-gray-400 text-center">
            Join to keep track of your expenses
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              id="name"
              name="name"
              value={signUpData.name}
              onChange={handleChange}
            />
            <InputField
              label="Username"
              id="username"
              name="username"
              value={signUpData.username}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              id="password"
              name="password"
              type="password"
              value={signUpData.password}
              onChange={handleChange}
            />
            <div className="flex gap-10">
              <RadioButton
                id="male"
                label="Male"
                name="gender"
                value="male"
                onChange={handleChange}
                checked={signUpData.gender === "male"}
              />
              <RadioButton
                id="female"
                label="Female"
                name="gender"
                value="female"
                onChange={handleChange}
                checked={signUpData.gender === "female"}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-400 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
