"use client";

import { authClient } from "@/lib/auth-client";

const TestAuth = () => {
  const handleTest = async () => {
    try {
      // Get JWT from Better Auth
      const { data: tokenData, error } = await authClient.token();

      if (error || !tokenData?.token) {
        throw new Error("Could not retrieve JWT.");
      }

      // Send JWT to Express backend
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/test-auth`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        },
      );

      const result = await res.json();

      console.log("Backend response:", result);
    } catch (error) {
      console.error("Authentication test failed:", error);
    }
  };

  return (
    <button
      onClick={handleTest}
      className="bg-blue-600 text-white px-5 py-2 rounded-lg"
    >
      Test Backend Authentication
    </button>
  );
};

export default TestAuth;
