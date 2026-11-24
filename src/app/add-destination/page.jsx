import React from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import AddDestinationForm from "../components/AddDestinationForm";
import { addDestination } from "../lib/actions";

const AddDestinationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const isAdmin = session.user.id === process.env.NEXT_PUBLIC_ADMIN_USER_ID;

  if (!isAdmin) {
    redirect("/destinations");
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold">Add destination</h1>
      <AddDestinationForm addDestinationAction={addDestination} />
    </div>
  );
};

export default AddDestinationPage;
