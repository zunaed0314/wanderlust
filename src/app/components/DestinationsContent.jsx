"use client";

import React, { useMemo, useState } from "react";
import DestCard from "./DestCard";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";

const DestinationsContent = ({ destinations, location }) => {
  const [search, setSearch] = useState(location);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(true);

  // Get unique countries and categories from the destination data.
  const countries = [
    ...new Set(destinations.map((dest) => dest.country).filter(Boolean)),
  ];

  const categories = [
    ...new Set(destinations.map((dest) => dest.category).filter(Boolean)),
  ];

  // Apply search, country, and category filters.
  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        dest.destinationName?.toLowerCase().includes(searchValue) ||
        dest.country?.toLowerCase().includes(searchValue) ||
        dest.category?.toLowerCase().includes(searchValue);

      const matchesCountry =
        selectedCountry === "all" || dest.country === selectedCountry;

      const matchesCategory =
        selectedCategory === "all" || dest.category === selectedCategory;

      return matchesSearch && matchesCountry && matchesCategory;
    });
  }, [destinations, search, selectedCountry, selectedCategory]);

  // Reset all filters and the search input.
  const clearFilters = () => {
    setSearch("");
    setSelectedCountry("all");
    setSelectedCategory("all");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    selectedCountry !== "all" ||
    selectedCategory !== "all";

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Explore Destinations
        </h1>
        <p className="mt-2 text-slate-500">
          Find your next adventure from our available destinations.
        </p>
      </div>

      {/* Filter toggle and clear button */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setShowFilters((previous) => !previous)}
          aria-expanded={showFilters}
          className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
            showFilters
              ? "border-cyan-500 bg-cyan-50 text-cyan-700"
              : "border-slate-200 bg-white text-slate-700 hover:border-cyan-500 hover:text-cyan-700"
          }`}
        >
          <SlidersHorizontal size={18} />
          {showFilters ? "Hide Filters" : "Show Filters"}

          <ChevronDown
            size={17}
            className={`transition-transform duration-300 ${
              showFilters ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm font-medium text-red-500 transition hover:text-red-600"
          >
            <X size={16} />
            Clear filters
          </button>
        )}
      </div>

      {/* Smoothly expanding and collapsing filter panel */}
      <div
        className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-in-out ${
          showFilters
            ? "mb-8 grid-rows-[1fr] opacity-100"
            : "mb-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <SlidersHorizontal size={19} className="text-cyan-600" />
              <h2 className="font-semibold text-slate-800">
                Filter Destinations
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Search filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Search
                </label>

                <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-3 focus-within:border-cyan-500">
                  <Search size={18} className="text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Destination, country, category..."
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              {/* Country filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Country
                </label>

                <select
                  value={selectedCountry}
                  onChange={(event) => setSelectedCountry(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-cyan-500"
                >
                  <option value="all">All Countries</option>

                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Category
                </label>

                <select
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-cyan-500"
                >
                  <option value="all">All Categories</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-800">
            {filteredDestinations.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-800">
            {destinations.length}
          </span>{" "}
          destinations
        </p>
      </div>

      {/* Destination cards */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((dest) => (
            <DestCard key={dest._id} dest={dest} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <Search size={35} className="mx-auto mb-3 text-slate-300" />

          <h2 className="text-2xl font-bold text-gray-800">
            No destinations found
          </h2>

          <p className="mt-2 text-gray-500">
            Try changing your search or filters.
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DestinationsContent;
