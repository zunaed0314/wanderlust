import React from "react";
import DestinationsContent from "../components/DestinationsContent";

const DestinationPage = async ({ searchParams }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destinations`);

  if (!res.ok) {
    throw new Error("Failed to fetch destinations");
  }

  const destinationData = await res.json();

  const { location } = await searchParams;

  return (
    <DestinationsContent
      destinations={destinationData}
      location={location || ""}
    />
  );
};

export default DestinationPage;
