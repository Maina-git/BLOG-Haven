import React from "react";
import { FaEye, FaEyeSlash, FaBlog } from "react-icons/fa6";
import { useAuth } from "../context/useAuth";

const Login: React.FC = () => {
  const {
    email,
    password,
    confirmPassword,
    showPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    toggleShowPassword,
    login,
  } = useAuth();

  return (
    <div className="w-full h-screen bg-pink-600 flex flex-col items-center justify-center">
      <FaBlog className="text-white text-5xl my-10" />
      <form onSubmit={login} className="p-5 bg-white flex flex-col rounded">
        <h1 className="font-bold text-2xl text-center my-3 text-pink-600">
          DOJO BLOG
        </h1>

        <div className="flex flex-col my-1">
          <label htmlFor="" className="text-pink-600">Email:</label>
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 w-[300px] border border-pink-600 outline-none rounded"
            placeholder="Enter Email"
          />
        </div>
        <div className="flex flex-col my-5">
          <label htmlFor="" className="text-pink-600">Password:</label>
          <div className="p-2 w-[300px] border border-pink-600 rounded flex justify-between">
            <input
              value={password}
              type={!showPassword ? "password" : "text"}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-black outline-none"
              placeholder="Enter Password"
            />
            {!showPassword ? (
              <FaEye onClick={toggleShowPassword} />
            ) : (
              <FaEyeSlash onClick={toggleShowPassword} />
            )}
          </div>
        </div>
        <div className="flex flex-col my-5">
          <label htmlFor="" className="text-pink-600">Confirm Password:</label>
          <div className="p-2 w-[300px] border border-pink-600 rounded flex justify-between">
            <input
              value={confirmPassword}
              type={!showPassword ? "password" : "text"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent text-black outline-none"
              placeholder="Confirm Password"
            />
            {!showPassword ? (
              <FaEye onClick={toggleShowPassword} />
            ) : (
              <FaEyeSlash onClick={toggleShowPassword} />
            )}
          </div>
        </div>
        <button
          className="w-full my-5 p-1 rounded bg-pink-600 text-white"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
