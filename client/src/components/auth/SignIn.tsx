import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const SignIn: React.FC = () => {
  return (
    <div className="space-y-6 shadow-lg p-8 rounded-md max-w-xl mx-auto mt-16">
      <div>
        <p className="text-2xl font-semibold text-center">Sign In</p>
        <p className="text-md text-gray-500 text-center">
          Enter your credentials to access your account
        </p>
      </div>
      <div className="space-y-2">
        <label>Email:</label>
        <Input type="email" name="email" placeholder="Enter your email" />
      </div>
      <div className="space-y-2">
        <label>Password:</label>
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
        />
      </div>
      <Button className="w-full">Sign In</Button>
      <div className="flex justify-center items-center gap-2">
        <p>Don't have an Account</p>
        <Link to="/signup" className="underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
