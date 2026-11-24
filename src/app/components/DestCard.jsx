import Image from "next/image";
import React from "react";
import { MapPin, CalendarDays, Clock, Heart, ArrowRight } from "lucide-react";
import { Work_Sans } from "next/font/google";
import Link from "next/link";
const work_Sans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const DestCard = ({ dest }) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={dest.imageUrl}
          alt={dest.destinationName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute left-4 top-4 rounded-full bg-cyan-500 px-4 py-1.5 text-sm font-semibold text-white">
          {dest.category}
        </div>

        <button className="absolute right-4 top-4 rounded-full bg-white p-2.5 text-gray-700 shadow-md transition hover:text-red-500">
          <Heart size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {dest.destinationName}
          </h2>

          <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <MapPin size={16} />
            {dest.country}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Starting from</p>
            <p className="text-2xl font-bold text-cyan-600">${dest.price}</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock size={17} />
            {dest.duration}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays size={17} />
          {dest.departureDate}
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-gray-600">
          {dest.description}
        </p>

        <div className="border-t border-gray-100 pt-4">
          <Link href={`/destinations/${dest._id}`}>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-600">
              View Details
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestCard;
