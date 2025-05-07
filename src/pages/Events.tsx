// src/pages/Events.tsx
import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { Button } from "../components/Button";
import { FaChevronDown } from "react-icons/fa";
import { fetchEvents, Event } from "../services/api";

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [visibleEvents, setVisibleEvents] = useState(5);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for filters
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterPlace, setFilterPlace] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const places = Array.from(new Set(events.map(e => e.place)));

  // Fetch events from backend API
  useEffect(() => {
    fetchEvents()
      .then(data => setEvents(data))
      .catch(err => {
        console.error(err);
        setError("Failed to load events. Please try again later.");
      });
  }, []);

  // Filter events based on selected filters
  const filteredEvents = events.filter(e => {
    // Date filter
    if (filterDate && e.date !== filterDate) return false;

    // Place filter
    if (filterPlace && e.place !== filterPlace) return false;

    // Price filter
    const price = e.discount
      ? e.price * (1 - e.discount / 100)
      : e.price;
    
    // Check if minPrice isn´t empty
    if (minPrice !== "" && price < Number(minPrice)) return false;

    // Check if maxPrice isn´t empty
    if (maxPrice !== "" && price > Number(maxPrice)) return false;

    return true;
  });
    


  const loadMoreEvents = () => {
    setVisibleEvents(prev => prev + 5);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header summary */}
      <div className="mx-10 flex justify-between items-center text-lg font-semibold pt-8">
        <div>{filteredEvents.length} Products</div>
        <button
          onClick={() => setShowFilters(v => !v)}
          className="flex items-center gap-2 underline"
        >
          Show {Math.min(visibleEvents, filteredEvents.length)} products <FaChevronDown />
        </button>
      </div>

      {showFilters && (
        <div className="mx-10 mb-6 p-4 bg-gray-100 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={filterDate}
              onChange={e => setFilterDate(e.target.value)}
              className="w-full px-2 py-1 rounded-md border"
            />
          </div>

          {/* Place Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Place</label>
            <select
              value={filterPlace}
              onChange={e => setFilterPlace(e.target.value)}
              className="w-full px-2 py-1 rounded-md border"
            >
              <option value="">All</option>
              {places.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Min Price</label>
              <input
                type="number"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                className="w-full px-2 py-1 rounded-md border"
                placeholder="0"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Max Price</label>
              <input
                type="number"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                className="w-full px-2 py-1 rounded-md border"
                placeholder="0"
              />
            </div>
          </div>
        </div>
      )}

      <div className="p-8 bg-white">
        {/* Events grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {filteredEvents.slice(0, visibleEvents).map(event => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        {/* Progress & Load More */}
        <div className="flex flex-col items-center mt-8">
          {/* Progress Bar */}
          <div className="flex justify-center w-full mb-6">
            <div className="w-80 bg-gray-400 rounded-full h-2">
              <div
                className="bg-[rgb(60,60,60)] h-2 rounded-full"
                style={{ width: `${(visibleEvents / filteredEvents.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Show More Button */}
          {visibleEvents < filteredEvents.length && (
            <Button
              label={
                <>
                  <FaChevronDown className="inline-block mr-2" />
                  Show More
                </>
              }
              onClick={loadMoreEvents}
              className="bg-[rgb(60,60,60)] w-full max-w-sm text-white text-lg font-semibold py-3 rounded-lg flex justify-center items-center"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;