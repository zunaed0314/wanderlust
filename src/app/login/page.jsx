import React, { Suspense } from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-[90vh] flex justify-center items-center">
          Loading login...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
