"use client";
import { Card } from "@heroui/react";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Calendar } from "@gravity-ui/icons";
import { DateField, Label, Button } from "@heroui/react";
import toast from "react-hot-toast";

const BookingCard = ({ data, addBookingAction }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [departureDate, setDepartureDate] = useState(null);
  console.log(departureDate);
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const handleBooking = async () => {
    const bookingData = {
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      destinationId: data?._id,
      destinationName: data?.destinationName,
      price: data?.price,
      imageUrl: data?.imageUrl,
      country: data?.country,
      departureDate: new Date(departureDate),
    };
    console.log(bookingData);
    const result = await addBookingAction(bookingData);

    if (result) {
      toast.success("You booked successfully!");
    }
  };
  return (
    <div className="space-y-2 p-6 md:p-10">
      <Card className="p-5">
        <p>Starting from</p>
        <p className="text-2xl text-cyan-500 font-bold">$ {data.price}</p>
        <p>per person</p>
        <p className="font-semibold text-xl">Departure date</p>
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
        <Button onClick={handleBooking}>Book Now</Button>
      </Card>
    </div>
  );
};

export default BookingCard;
