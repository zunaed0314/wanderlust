import { Button } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { CalendarDays, MapPin, Ticket, ArrowUpRight } from "lucide-react";
import BookingCancel from "./BookingCancel";
import { deleteBooking } from "../lib/actions";

const MyBookingCard = ({ index, book }) => {
  const departureDate = new Date(book.departureDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="group flex flex-col md:flex-row overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Destination Image */}
      <div className="relative h-56 w-full shrink-0 md:h-auto md:min-h-[240px] md:w-72">
        <Image
          src={book.imageUrl}
          alt={book.destinationName}
          fill
          sizes="(max-width: 768px) 100vw, 288px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          Booking #{index}
        </div>
      </div>

      {/* Booking Information */}
      <div className="flex flex-1 flex-col justify-between gap-6 p-5 md:p-7">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Confirmed
            </span>
            <span className="text-sm text-gray-400">Your trip booking</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              {book.destinationName}
            </h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={16} className="text-cyan-600" />
              {book.country}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 rounded-xl bg-gray-50 p-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white p-2.5 shadow-sm">
                <CalendarDays size={19} className="text-cyan-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Departure Date</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {departureDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white p-2.5 shadow-sm">
                <Ticket size={19} className="text-cyan-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Booking Reference</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  #{index}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex flex-col gap-4 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400">Total Price</p>
            <p className="mt-1 text-2xl font-bold text-cyan-600">
              ${book.price}
              <span className="ml-1 text-xs font-normal text-gray-400">
                / person
              </span>
            </p>
          </div>

          <div className="flex gap-3">
            <BookingCancel
              bookingId={book._id}
              deleteBookingAction={deleteBooking}
            ></BookingCancel>
            <Button className="bg-cyan-600 font-semibold text-white hover:bg-cyan-700">
              View Details
              <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingCard;
