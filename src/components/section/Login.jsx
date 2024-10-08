import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");

    if (storedEmail) {
      setInput({ email: storedEmail, password: "" });
      setRememberMe(true);
    }
  }, []);

  const navigate = useNavigate();
  const appUrl = import.meta.env.REACT_APP_API_URL;
  const mutation = useMutation({
    mutationFn: async (newUser) => {
      const response = await axios.post(`${appUrl}/user/login`, newUser, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        navigate("/");
        toast.success(data.message);

        if (rememberMe) {
          localStorage.setItem("email", input.email);
        } else {
          localStorage.removeItem("email");
        }

        setInput({
          email: "",
          password: "",
        });
      } else {
        toast.error(data.message || "Login failed.");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data.message || "An error occurred.");
    },
  });

  const validateInput = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!input.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(input.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!input.password) {
      newErrors.password = "Password is required.";
    } else if (input.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(input.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(input.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(input.password)) {
      newErrors.password = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*]/.test(input.password)) {
      newErrors.password =
        "Password must contain at least one special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = (e) => {
    e.preventDefault();
    if (validateInput()) {
      mutation.mutate(input);
    }
  };

  return (
    <section className="flex items-center w-screen h-screen justify-center">
      <form onSubmit={signupHandler} className="flex flex-col gap-4 p-8">
        <div className="flex flex-col items-center justify-center">
          <h1>Logo</h1>
          <p className="p-4">Welcome back User, please login to continue</p>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="Email"
            className="focus-visible:ring-1"
          />
          {errors.email && <p className="text-red-600">{errors.email}</p>}

          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="Password"
            className="focus-visible:ring-1"
          />
          {errors.password && <p className="text-red-600">{errors.password}</p>}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label
              htmlFor="remember-me"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
        </div>

        <Button
          className="bg-pink hover:bg-pink"
          type="submit"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? (
            <Loader2 className="animate-spin mr-2" />
          ) : (
            "Login"
          )}
        </Button>
        <div className="flex items-center justify-between">
          <p>Doesn't have an account?</p>

          <Link to="/signup" className="text-sm font-medium underline">
            Sign Up
          </Link>
        </div>
      </form>
    </section>
  );
}
