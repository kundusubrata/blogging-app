import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSigninMutation } from "@/redux/api/userApi";
import MetaData from "../layout/MetaData";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";

type FormState = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [signin, { isLoading, isError, error, isSuccess }] =
    useSigninMutation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (isError) {
      if ("data" in error) {
        toast.error(
          (error.data as { message?: string })?.message || "An error occurred"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    }

    if (isSuccess) {
      toast.success("Login successful");
    }
  }, [isError, error, isSuccess, isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Form data:", formData);
    signin(formData);
    setFormData({ email: "", password: "" });
  };

  return (
    <>
      <MetaData title="Sign In" />
      <div className="space-y-6 shadow-lg p-8 rounded-md max-w-xl mx-auto mt-16">
        <div>
          <p className="text-2xl font-semibold text-center">Sign In</p>
          <p className="text-md text-gray-500 text-center">
            Enter your credentials to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !formData.email || !formData.password}
          >
            {isLoading ? "Authenticating ..." : "Sign In"}
          </Button>
        </form>
        <div className="flex justify-center items-center gap-2">
          <p>Don't have an Account</p>
          <Link to="/signup" className="underline">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignIn;
