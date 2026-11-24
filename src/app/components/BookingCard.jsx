"use client";

import { Card } from "@heroui/react";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Calendar } from "@gravity-ui/icons";
import { DateField, Label, Button } from "@heroui/react";
import toast from "react-hot-toast";

const BookingCard = ({ data }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [departureDate, setDepartureDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    try {
      if (!user) {
        throw new Error("Please log in first.");
      }

      if (!departureDate) {
        throw new Error("Please select a departure date.");
      }

      setLoading(true);

      // Retrieve JWT from Better Auth
      const { data: tokenData, error } = await authClient.token();
      console.log(tokenData);

      if (error || !tokenData?.token) {
        throw new Error("Unable to retrieve authentication token.");
      }

      const bookingData = {
        destinationId: data._id,
        departureDate: new Date(departureDate).toISOString(),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Booking failed.");
      }

      toast.success("You booked successfully!");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2 p-6 md:p-10">
      <Card className="p-5">
        <p>Starting from</p>
        <p className="text-2xl font-bold text-cyan-500">$ {data.price}</p>
        <p>per person</p>

        <p className="text-xl font-semibold">Departure date</p>

        <DateField
          onChange={setDepartureDate}
          className="w-[256px]"
          name="date"
        >
          <Label>Date</Label>
          <DateField.Group>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateField.Suffix>
              <Calendar className="size-4 text-muted" />
            </DateField.Suffix>
          </DateField.Group>
        </DateField>

        <Button
          onPress={handleBooking}
          isLoading={loading}
          isDisabled={!user || loading}
        >
          Book Now
        </Button>
      </Card>
    </div>
  );
};

export default BookingCard;
