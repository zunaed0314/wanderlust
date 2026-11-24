"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve the original destination URL.
  const requestedURL = searchParams.get("callbackURL");

  // Prevent external redirects.
  const callbackURL =
    requestedURL?.startsWith("/") && !requestedURL.startsWith("//")
      ? requestedURL
      : "/";

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      callbackURL,
    });

    console.log({ data, error });

    if (error) {
      alert(error.message || "Login failed");
      return;
    }

    if (data) {
      router.replace(callbackURL);
      router.refresh();
    }
  };

  const signIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL,
    });

    if (error) {
      alert(error.message || "Google login failed");
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center gap-5">
      <h1 className="text-4xl font-bold">Login to your account</h1>

      <Card className="shadow-2xl border border-black">
        <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          <div className="flex gap-2">
            <Button type="submit">
              <Check />
              Login
            </Button>

            <Button type="reset" variant="secondary">
              Reset
            </Button>
          </div>
        </Form>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-3 w-full">
            <span className="h-px flex-1 bg-gray-300" />
            <span className="text-sm text-gray-500">or sign in with</span>
            <span className="h-px flex-1 bg-gray-300" />
          </div>

          <Button
            onClick={signIn}
            className="rounded-none w-full"
            variant="outline"
          >
            <FcGoogle />
            Sign in with Google
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
