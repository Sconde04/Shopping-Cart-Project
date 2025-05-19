// src/components/EventsFilter.tsx
import React, { useMemo, useEffect } from "react";
import { Event, fetchFilteredEvents } from "../services/api";

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

  // Fetch filtered events when filters change
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params: {
          minPrice?: number;
          maxPrice?: number;
          date?: string;
          place?: string;
        } = {};

        if (minPrice) params.minPrice = Number(minPrice);
        if (maxPrice) params.maxPrice = Number(maxPrice);
        if (filterDate) params.date = filterDate;
        if (filterPlace) params.place = filterPlace;

        const filteredEvents = await fetchFilteredEvents(params);
        onFilteredEvents(filteredEvents);
      } catch (error) {
        console.error('Error fetching filtered events:', error);
        // En caso de error mostrremos todos los events para no dejar la pagina vacia
        onFilteredEvents(events);
      }
    };

    fetchEvents();
  }, [events, filterDate, filterPlace, minPrice, maxPrice, onFilteredEvents]);

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