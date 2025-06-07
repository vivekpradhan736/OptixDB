import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '../../redux/authSlice';

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import store from '../../redux/store';
import { hasTokenCookie } from '../../lib/cookies';

const authFormSchema = () => {
  return z.object({
    email: z.string().email(),
    name: z.string().min(2).max(50),
    password: z.string().min(8).max(50)
  });
};

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
        const isAuthenticated = store.getState().auth.isAuthenticated || hasTokenCookie();
        if (isAuthenticated) {
          navigate('/');
        }
        else{
          navigate('/signup');
        }
      }, [navigate]);

  const formSchema = authFormSchema();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const name = values.name;
      const email = values.email;
      const password = values.password;
      const res = await axios.post('https://optixdb-backend.onrender.comnd.onrender.com/api/auth/register', { name, email, password }, {withCredentials: true,});
      dispatch(login({ token: res.data.token, user: res.data.user }));
      navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <div className="flex min-h-screen w-full">
      <section className="hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <img
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={224}
            height={82}
            className="h-auto"
          />

          <div className="space-y-5 text-white">
            <h1 className="h1">Manage your files the best way</h1>
            <p className="body-1">
              This is a place where you can store all your documents.
            </p>
          </div>
          <img
            src="/assets/images/files.png"
            alt="Files"
            width={342}
            height={342}
            className="transition-all hover:rotate-2 hover:scale-105"
          />
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <img
            src="/assets/icons/logo-full-brand.svg"
            alt="logo"
            width={224}
            height={82}
            className="h-auto w-[200px] lg:w-[250px]"
          />
        </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="auth-form">
          <h1 className="form-title">
            Sign Up
          </h1>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Full Name</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Password</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      className="shad-input"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            Sign Up

            {isLoading && (
              <img
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && <p className="error-message">*{errorMessage}</p>}

          <div className="body-2 flex justify-center">
            <p className="text-light-100">
                Already have an account?
            </p>
            <Link
              to="/login"
              className="ml-1 font-medium text-brand"
            >
              {" "}
              Sign In
            </Link>
          </div>
        </form>
      </Form>
      </section>
    </div>
    </>
  );
}

export default SignUp;