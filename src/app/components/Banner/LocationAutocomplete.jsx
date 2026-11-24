"use client";

import { useState, useEffect } from "react";
import { MapPin, Search, LoaderCircle } from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_SERVER_URL}`;

const LocationAutocomplete = ({ onChange, onSearch, isSearchOpen }) => {
  // Stores the text currently typed in the input field.
  const [query, setQuery] = useState("");

  // Stores all destinations fetched from the backend.
  const [destinations, setDestinations] = useState([]);

  // Controls whether the suggestion dropdown is visible.
  const [isOpen, setIsOpen] = useState(false);

  // Tracks the loading state while fetching destinations.
  const [isLoading, setIsLoading] = useState(false);

  // Stores any error that occurs while fetching destinations.
  const [error, setError] = useState("");

  // Controls whether the Search button displays its text or only its icon.
  //   const [isSearched, setIsSearched] = useState(false);

  const [isButtonCollapsed, setIsButtonCollapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonCollapsed(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Fetch destinations from the backend when needed.
  const loadDestinations = async () => {
    // Avoid fetching the same destinations multiple times.
    if (destinations.length > 0) return;

    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/destinations`);

      if (!response.ok) {
        throw new Error("Failed to load destinations.");
      }

      const data = await response.json();
      setDestinations(data);
    } catch (error) {
      console.error(error);
      setError("Could not load destinations.");
    } finally {
      setIsLoading(false);
    }
  };

  // Open the suggestion dropdown and load destinations.
  const handleFocus = () => {
    setIsOpen(true);
    loadDestinations();
  };

  // Runs when the user selects a destination from the suggestions.
  const handleSelect = (destination) => {
    onChange(destination);
    setQuery(destination.destinationName);
    setIsOpen(false);
  };

  // Filter destinations based on the text typed by the user.
  const filteredDestinations = destinations.filter((destination) => {
    const searchValue = query.toLowerCase().trim();

    return (
      destination.destinationName?.toLowerCase().includes(searchValue) ||
      destination.country?.toLowerCase().includes(searchValue) ||
      destination.category?.toLowerCase().includes(searchValue)
    );
  });

  // Search using the selected destination or the text typed by the user.
  const handleSearch = () => {
    setIsOpen(false);

    // Shrink the Search button and hide its text.
    // setIsSearched(true);

    // Pass the current input text to the parent component.
    onSearch(query);
  };

  return (
    <div className="relative min-w-0 w-full">
      <div className="flex items-center gap-2 rounded-xl border border-cyan-500 bg-white px-3 py-3">
        <MapPin size={21} className="shrink-0 text-cyan-600" />

        <div className="min-w-0 flex-1">
          <label className="block text-xs font-bold text-slate-800">
            Location
          </label>

          <input
            type="text"
            value={query}
            onChange={(event) => {
              // Update the input text as the user types.
              setQuery(event.target.value);

              // Show suggestions while typing.
              setIsOpen(true);

              // Restore the Search button when the user starts a new search.
              //   setIsSearched(false);

              // Clear the previously selected destination.
              onChange(null);
            }}
            onFocus={handleFocus}
            onKeyDown={(event) => {
              // Close suggestions when the user presses Escape.
              if (event.key === "Escape") {
                setIsOpen(false);
              }

              // Search when the user presses Enter.
              if (event.key === "Enter") {
                event.preventDefault();
                handleSearch();
              }
            }}
            placeholder="Search destinations..."
            className="w-full bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Search button with smooth text and width animation. */}

        {/* Search button: smoothly changes from text + icon to icon only. */}
        <button
          type="button"
          onClick={handleSearch}
          aria-label="Search destinations"
          className={`flex h-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-cyan-500 text-slate-950 transition-all duration-500 ease-in-out hover:bg-cyan-400 ${
            isButtonCollapsed ? "w-10 gap-0 px-2" : "w-24 gap-2 px-3"
          }`}
        >
          <Search size={20} className="shrink-0" />

          <span
            className={`block overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-500 ease-in-out ${
              isButtonCollapsed ? "w-0 opacity-0" : "w-12 opacity-100"
            }`}
          >
            Search
          </span>
        </button>
      </div>

      {/* Display the suggestion dropdown when it is open. */}
      {isOpen && (
        <>
          {/* Clicking outside the dropdown closes the suggestions. */}
          <button
            type="button"
            aria-label="Close suggestions"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute left-0 top-full z-[100] mt-3 max-h-72 w-full min-w-64 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 text-slate-800 shadow-xl">
            {isLoading ? (
              // Show a loading indicator while fetching destinations.
              <div className="flex items-center justify-center gap-2 p-5 text-sm text-slate-500">
                <LoaderCircle size={18} className="animate-spin" />
                Loading destinations...
              </div>
            ) : error ? (
              // Show an error if the request fails.
              <p className="p-4 text-center text-sm text-red-500">{error}</p>
            ) : filteredDestinations.length > 0 ? (
              // Show up to 8 matching destinations.
              filteredDestinations.slice(0, 8).map((destination) => (
                <button
                  key={destination._id}
                  type="button"
                  onClick={() => handleSelect(destination)}
                  className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition hover:bg-cyan-50"
                >
                  <div className="rounded-full bg-cyan-100 p-2">
                    <MapPin size={17} className="text-cyan-600" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">
                      {destination.destinationName}
                    </p>

                    <p className="text-xs text-slate-500">
                      {destination.country} · {destination.category}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              // Show a message when no destinations match the query.
              <div className="p-5 text-center">
                <Search className="mx-auto mb-2 text-slate-400" size={22} />

                <p className="text-sm font-medium text-slate-700">
                  No destinations found
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Try another destination or country.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LocationAutocomplete;
