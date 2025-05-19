// src/components/EventsFilter.tsx
import React, { useMemo, useEffect } from "react";
import { Event } from "../services/api";

interface EventsFilterProps {
  events: Event[];
  filterDate: string;
  setFilterDate: (date: string) => void;
  filterPlace: string;
  setFilterPlace: (place: string) => void;
  minPrice: string;
  setMinPrice: (price: string) => void;
  maxPrice: string;
  setMaxPrice: (price: string) => void;
  onFilteredEvents: (filtered: Event[]) => void;
}

const EventsFilter: React.FC<EventsFilterProps> = ({
  events,
  filterDate,
  setFilterDate,
  filterPlace,
  setFilterPlace,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onFilteredEvents,
}) => {
  // Memorize the places to show in the filter
  const places = useMemo(
    () => Array.from(new Set(events.map((e) => e.place))),
    [events]
  );

  // useMemo to memorized the state of the filters
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      // Date filer
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
  }, [events, filterDate, filterPlace, minPrice, maxPrice]);

  // Update filteredEvents when change
  useEffect(() => {
    onFilteredEvents(filteredEvents);
  }, [filteredEvents, onFilteredEvents]);

  return (
    <div className="mx-10 mb-6 p-4 bg-gray-100 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Date Filter */}
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="w-full px-2 py-1 rounded-md border"
        />
      </div>

      {/* Place Filter */}
      <div>
        <label className="block text-sm font-medium mb-1">Place</label>
        <select
          value={filterPlace}
          onChange={(e) => setFilterPlace(e.target.value)}
          className="w-full px-2 py-1 rounded-md border"
        >
          <option value="">All</option>
          {places.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
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
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-2 py-1 rounded-md border"
            placeholder="0"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-2 py-1 rounded-md border"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};

export default EventsFilter;