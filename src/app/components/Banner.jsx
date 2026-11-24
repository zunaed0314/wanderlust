"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, Wallet, Users, Search, ArrowRight } from "lucide-react";
import LocationAutocomplete from "../components/Banner/LocationAutocomplete";

const Banner = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const router = useRouter();

  const handleSearch = (query) => {
    const searchValue = selectedLocation?.destinationName || query;

    const params = new URLSearchParams();

    if (searchValue.trim()) {
      params.set("location", searchValue.trim());
    }

    router.push(`/destinations?${params.toString()}`);
  };

  return (
    <section className="relative flex min-h-[700px] flex-col justify-between bg-[url('/assets/Banner.png')] bg-cover bg-center text-white md:min-h-[680px]">
      {/* Background overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/85 via-slate-900/55 to-slate-950/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/10" />

      {/* Hero content */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-5 py-16 lg:px-8">
        <div className="max-w-3xl">
          <span className="mb-6 inline-flex items-center rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold tracking-wide text-cyan-200 backdrop-blur-md">
            EXPLORE THE WORLD WITH WANDERLUST
          </span>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Discover Your
            <br />
            Next <span className="text-cyan-400">Adventure</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-200 sm:text-lg md:text-xl">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/destinations"
              className="group inline-flex items-center gap-2 rounded-full bg-cyan-500 px-7 py-3.5 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
            >
              Explore Now
              <ArrowRight
                size={19}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/destinations"
              className="inline-flex items-center rounded-full border border-white/60 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
            >
              View Destinations
            </Link>
          </div>
        </div>
      </div>

      {/* Search panel */}
      <div className="mx-auto w-full max-w-7xl px-5 pb-20 lg:px-8">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-white/30 bg-white/90 p-5 text-slate-800 shadow-2xl backdrop-blur-xl md:grid-cols-4 md:items-center md:gap-0 md:p-5 lg:grid-cols-[1.2fr_1.2fr_1fr_0.8fr]">
          {/* Animated Search / Location */}
          <div
            className={`relative border-b border-slate-200 pb-4 transition-all duration-500 ease-in-out md:border-b-0 md:border-r md:px-4 md:py-2 ${isSearchOpen ? "z-30" : "z-0"}`}
          >
            <div
              className={`transition-all duration-500 ease-in-out ${
                isSearchOpen ? "w-full" : "w-32"
              }`}
            >
              {!isSearchOpen ? (
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-4 font-bold text-slate-950 transition hover:bg-cyan-400"
                >
                  <Search size={20} />
                  Search
                </button>
              ) : (
                <LocationAutocomplete
                  onChange={setSelectedLocation}
                  onSearch={handleSearch}
                  isSearchOpen={isSearchOpen}
                />
              )}
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4 md:border-b-0 md:border-r md:px-4 md:py-2">
            <CalendarDays size={23} className="shrink-0 text-cyan-600" />
            <div className="min-w-0">
              <h3 className="font-bold">Date / Duration</h3>
              <p className="truncate text-sm text-slate-500">
                Anytime / 3 Days
              </p>
            </div>
          </div>

          {/* Budget */}
          <div className="flex items-center gap-3 md:border-r md:px-4 md:py-2">
            <Wallet size={23} className="shrink-0 text-cyan-600" />
            <div className="min-w-0">
              <h3 className="font-bold">Budget</h3>
              <p className="truncate text-sm text-slate-500">$0 - $3000</p>
            </div>
          </div>

          {/* People */}
          <div className="flex items-center gap-3 md:px-4 md:py-2">
            <Users size={23} className="shrink-0 text-cyan-600" />
            <div className="min-w-0">
              <h3 className="font-bold">People</h3>
              <p className="truncate text-sm text-slate-500">5 - 10 People</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
