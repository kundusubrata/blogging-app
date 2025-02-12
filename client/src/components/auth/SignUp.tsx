import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useSignupMutation } from "@/redux/api/userApi";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";

type FormState = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [formData, setFormData] = useState<FormState>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [signup, { isLoading, isError, error, isSuccess }] =
    useSignupMutation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (isError && error && "data" in error) {
      toast.error(
        (error.data as { message?: string })?.message || "An error occurred"
      );
    } else if (isError) {
      toast.error("An unexpected error occurred");
    }

    if (isSuccess) {
      toast.success("Signup successful");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
    }
  }, [isError, error, isSuccess, isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Form data:", formData);
    signup(formData);
  };

  return (
    <>
      <MetaData title="Sign Up" />
      <div className="space-y-6 shadow-lg p-8 rounded-md max-w-xl mx-auto mt-16">
        <div>
          <p className="text-2xl font-semibold text-center">Sign Up</p>
          <p className="text-md text-gray-500 text-center">
            Enter your information to create your account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label>First Name:</label>
            <Input
              type="text"
              name="firstname"
              placeholder="Enter your first name"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label>Last Name:</label>
            <Input
              type="text"
              name="lastname"
              placeholder="Enter your last name"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label>Email:</label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label>Password:</label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={
              isLoading ||
              !formData.firstname ||
              !formData.lastname ||
              !formData.email ||
              !formData.password
            }
          >
            {isLoading ? "Creating ..." : "Sign Up"}
          </Button>
        </form>
        <div className="flex justify-center items-center gap-2">
          <p>Already have an Account</p>
          <Link to="/signin" className="underline">
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
