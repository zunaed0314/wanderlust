"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const InactiveDestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [restoringId, setRestoringId] = useState(null);

  // Fetch inactive destinations
  useEffect(() => {
    const fetchInactiveDestinations = async () => {
      try {
        setLoading(true);
        setError("");

        // Get JWT from Better Auth
        const { data: tokenData, error: tokenError } = await authClient.token();

        if (tokenError || !tokenData?.token) {
          throw new Error("Authentication token could not be retrieved.");
        }

        // Request inactive destinations from Express
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/destinations/inactive`,
          {
            headers: {
              Authorization: `Bearer ${tokenData.token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch destinations.");
        }

        setDestinations(data.destinations);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchInactiveDestinations();
  }, []);

  // Restore a destination
  const handleRestore = async (destinationId) => {
    try {
      setRestoringId(destinationId);
      setError("");

      // Get JWT from Better Auth
      const { data: tokenData, error: tokenError } = await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error("Authentication token could not be retrieved.");
      }

      // Call the existing restore endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/destinations/${destinationId}/restore`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to restore destination.");
      }

      // Remove the restored destination from the inactive list
      setDestinations((previousDestinations) =>
        previousDestinations.filter(
          (destination) => destination._id !== destinationId,
        ),
      );
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setRestoringId(null);
    }
  };

  if (loading) {
    return <p>Loading inactive destinations...</p>;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Inactive Destinations</h1>

      {error && <p className="mb-4 text-red-500">{error}</p>}

      {destinations.length === 0 ? (
        <p>No inactive destinations found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <article
              key={destination._id}
              className="overflow-hidden rounded-xl border"
            >
              {destination.imageUrl && (
                <div className="relative h-52 w-full">
                  <Image
                    src={destination.imageUrl}
                    alt={destination.destinationName}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="space-y-3 p-4">
                <h2 className="text-xl font-semibold">
                  {destination.destinationName}
                </h2>

                <p>{destination.country}</p>

                <p>Price: {destination.price}</p>

                <p className="text-sm text-red-500">Inactive</p>

                <button
                  onClick={() => handleRestore(destination._id)}
                  disabled={restoringId === destination._id}
                  className="w-full rounded-lg bg-green-600 px-4 py-2 text-white disabled:opacity-50"
                >
                  {restoringId === destination._id
                    ? "Restoring..."
                    : "Restore Destination"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default InactiveDestinationsPage;
