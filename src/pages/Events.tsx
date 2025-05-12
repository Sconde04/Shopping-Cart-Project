// src/pages/Events.tsx
import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { Button } from "../components/Button";
import { FaChevronDown } from "react-icons/fa";
import { fetchEvents, Event } from "../services/api";
import EventsFilter from "../components/EventsFilter";

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [visibleEvents, setVisibleEvents] = useState(5);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for filters
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterPlace, setFilterPlace] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  // Fetch events from backend API
  useEffect(() => {
    fetchEvents()
      .then(data => {
        setEvents(data);
        setFilteredEvents(data);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load events. Please try again later.");
      });
  }, []);

  // Reset visibleEvents when filters change to update the number of events show
  useEffect(() => {
    setVisibleEvents(5);
  }, [filterDate, filterPlace, minPrice, maxPrice]);

  const loadMoreEvents = () => {
    setVisibleEvents(prev => prev + 5);
  };

  if (error && events.length === 0) {
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
        <EventsFilter
          events={events}
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          filterPlace={filterPlace}
          setFilterPlace={setFilterPlace}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          onFilteredEvents={setFilteredEvents}
        />
      )}

      <div className="p-8 bg-white">
        {/* Events grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {filteredEvents.slice(0, visibleEvents).map(event => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        {/* Progress & Load More */}
        <div className="flex flex-col items-center mt-14 mb-8">
          {/* Dynamic counter of visible events from total events */}
          <div className="text-lg font-semibold mb-2">
            Showing {Math.min(visibleEvents, filteredEvents.length)} of {filteredEvents.length} events
          </div>
          {/* Progress Bar */}
          <div className="flex justify-center w-full mb-6">
            <div className="w-60 bg-gray-400 rounded-full h-2">
              <div
                className="bg-[rgb(60,60,60)] h-2 rounded-full"
                style={{ width: `${(Math.min(visibleEvents, filteredEvents.length) / filteredEvents.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Show More Button */}
          {visibleEvents < filteredEvents.length && (
            <Button
              label={
                <>
                  <FaChevronDown className="inline-block mr-2" />
                  SHOW MORE
                </>
              }
              onClick={loadMoreEvents}
              className="bg-[rgb(60,60,60)] w-full max-w-sm text-white text-[16px] font-extrabold py-3 rounded-lg flex justify-center items-center mt-6"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;