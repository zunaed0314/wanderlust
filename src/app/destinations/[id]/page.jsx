import React from "react";
import Image from "next/image";
import EditDest from "@/app/components/EditDest";
import { MapPin, CalendarDays, Clock, Tag, DollarSign } from "lucide-react";
import {
  addBooking,
  deleteDestination,
  updateDestination,
} from "@/app/lib/actions";
import { Button } from "@heroui/react";
import Link from "next/link";
import DeleteButtonAction from "@/app/components/DeleteButtonAction";
import BookingCard from "@/app/components/BookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;
  const token = await auth.api.getToken({
    headers: await headers(),
  });

  console.log(token);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/destinations/${id}`,
    {
      headers: {
        authorization: `Bearer ${token.token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch destination details");
  }

  const data = await res.json();

  return (
    <div className="min-h-100vh bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg">
        {/* Destination Image */}
        <div className="relative h-80 w-full md:h-[450px]">
          <Image
            src={data.imageUrl}
            alt={data.destinationName}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1024px"
          />

          <div className="absolute bottom-5 left-5 rounded-full bg-cyan-500 px-4 py-2 font-semibold text-white">
            {data.category}
          </div>
        </div>

        {/* Destination Information */}
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2 p-6 md:p-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {data.destinationName}
              </h1>

              <p className="mt-3 flex items-center gap-2 text-gray-500">
                <MapPin size={19} className="text-cyan-500" />
                {data.country}
              </p>
            </div>

            {/* Quick Information */}
            <div className="grid grid-cols-1 gap-5 border-y border-gray-100 py-6 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <DollarSign size={25} className="text-cyan-500" />
                <div>
                  <p className="text-sm text-gray-400">Starting Price</p>
                  <p className="text-xl font-bold">${data.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock size={25} className="text-cyan-500" />
                <div>
                  <p className="text-sm text-gray-400">Duration</p>
                  <p className="text-xl font-bold">{data.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays size={25} className="text-cyan-500" />
                <div>
                  <p className="text-sm text-gray-400">Departure Date</p>
                  <p className="text-xl font-bold">{data.departureDate}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="mb-3 text-2xl font-bold text-gray-900">
                About This Destination
              </h2>

              <p className="leading-8 text-gray-600">{data.description}</p>
            </div>

            {/* Edit Destination */}
            <div className="border-t border-gray-100 pt-6 flex gap-5">
              <EditDest
                data={data}
                updateDestinationAction={updateDestination}
              />
              <Link href="/destinations">
                <Button vibrant="ghost">Go Back</Button>
              </Link>
              <DeleteButtonAction
                id={id}
                deleteDestinationAction={deleteDestination}
                data={data}
              ></DeleteButtonAction>
            </div>
          </div>
          <BookingCard data={data} addBookingAction={addBooking}></BookingCard>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
