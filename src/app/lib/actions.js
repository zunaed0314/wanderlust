import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const getAuthToken = async () => {
  const tokenResponse = await auth.api.getToken({
    headers: await headers(),
  });

  if (!tokenResponse?.token) {
    throw new Error("Authentication token is missing. Please log in again.");
  }

  console.log("JWT exists:", Boolean(tokenResponse.token));

  return tokenResponse.token;
};

// Update destination

export const updateDestination = async (formData, destId) => {
  "use server";

  const token = await getAuthToken();

  const dest = Object.fromEntries(formData.entries());

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/destinations/${destId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dest),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: data.message || "Failed to update destination",
    };
  }

  if (data.result?.matchedCount > 0) {
    revalidatePath("/destinations");
    revalidatePath(`/destinations/${destId}`);

    return {
      success: true,
      message: "Destination updated successfully!",
    };
  }

  return {
    success: false,
    message: "Destination not found",
  };
};

// ADD DESTINATION

export const addDestination = async (formData) => {
  "use server";

  const token = await getAuthToken();

  const destination = Object.fromEntries(formData.entries());

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/destinations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(destination),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: data.message || "Failed to add destination",
    };
  }

  if (data.insertedId) {
    revalidatePath("/destinations");

    return {
      success: true,
      message: "Destination added successfully!",
    };
  }

  return {
    success: false,
    message: "Destination could not be added",
  };
};

// Delete the destination Data

export const deleteDestination = async (destId) => {
  "use server";

  const token = await getAuthToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/destinations/${destId}`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to deactivate destination");
  }

  revalidatePath("/destinations");
  revalidatePath("/admin/inactive-destinations");

  redirect("/destinations");
};

// add data
export const addBooking = async (bookingDetails) => {
  "use server";

  console.log("Booking details:", bookingDetails);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingDetails),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Booking failed");
  }

  if (data.insertedId) {
    revalidatePath("/destinations");

    return true;
  }

  return false;
};

export const deleteBooking = async (bookingId) => {
  "use server";

  const token = await auth.api.getToken({
    headers: await headers(),
  });

  console.log(token);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${bookingId}`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token.token}`,
      },
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to cancel booking");
  }

  revalidatePath("/mybookings");

  return data;
};
