import React from "react";
import MyBookingCard from "../components/MyBookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const MyBookingPage = async () => {
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session?.user) {
    redirect("/login");
  }

  const token = await auth.api.getToken({
    headers: requestHeaders,
  });

  if (!token?.token) {
    throw new Error("Unable to retrieve authentication token.");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
    headers: {
      authorization: `Bearer ${token.token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bookings.");
  }

  const data = await res.json();
  const bookings = data.bookings;

  return (
    <div className="p-8 border shadow-md">
      <h1 className="text-center font-bold text-4xl mb-5">My bookings</h1>

      <div className="w-full flex flex-col gap-5">
        {bookings.length > 0 ? (
          bookings.map((book, index) => (
            <MyBookingCard key={book._id} index={index + 1} book={book} />
          ))
        ) : (
          <p className="text-center text-gray-500">
            You have&apos;t made any bookings yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyBookingPage;
