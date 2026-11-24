"use client";

import { authClient } from "@/lib/auth-client";

const TestToken = () => {
  const handleGetToken = async () => {
    try {
      const result = await authClient.token();

      console.log("JWT Result:", result);
    } catch (error) {
      console.error("Failed to retrieve JWT:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGetToken}
      className="rounded-lg bg-blue-600 px-4 py-2 text-white"
    >
      Get JWT Token
    </button>
  );
};

export default TestToken;
