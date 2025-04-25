import React, { useState } from "react";
import EventCard from "../components/EventCard";
import { Button } from "../components/Button";
import { FaChevronDown } from "react-icons/fa"; // Import icons

const Events: React.FC = () => {
  const events = [
    {
      image: "/public/event1.jpg",
      title: "Concierto de Rock",
      description: "Un concierto con las mejores bandas.",
      date: "22 de abril, 2025",
      time: "12:00",
      price: 119,
      discount: 20,
      place: "Madrid",
    },
    {
      image: "/public/event2.jpg",
      title: "Festival de Jazz",
      description: "Vive la magia del jazz en el festival anual.",
      date: "10 de mayo, 2025",
      time: "18:00",
      price: 95,
      place: "Barcelona",
    },
    {
      image: "/public/event1.jpg",
      title: "Concierto de Pop",
      description: "Un pop fest con los artistas más famosos.",
      date: "30 de mayo, 2025",
      time: "20:00",
      price: 110,
      discount: 10,
      place: "Valencia",
    },
    {
      image: "/public/event2.jpg",
      title: "Festival de Electrónica",
      description: "Disfruta de los DJ más populares.",
      date: "15 de junio, 2025",
      time: "15:00",
      price: 125,
      place: "Sevilla",
    },
    {
      image: "/public/event1.jpg",
      title: "Concierto de Metal",
      description: "Un concierto de los mejores grupos de metal.",
      date: "1 de julio, 2025",
      time: "17:00",
      price: 130,
      discount: 15,
      place: "Bilbao",
    },
    {
      image: "/public/event2.jpg",
      title: "Festival de Reggaetón",
      description: "El festival con los artistas más calientes.",
      date: "10 de agosto, 2025",
      time: "18:00",
      price: 100,
      place: "Granada",
    },
    {
      image: "/public/event1.jpg",
      title: "Concierto de Indie",
      description: "Una experiencia única con música indie.",
      date: "22 de agosto, 2025",
      time: "20:00",
      price: 105,
      discount: 5,
      place: "Alicante",
    },
    {
      image: "/public/event2.jpg",
      title: "Festival de Rock Clásico",
      description: "Los mejores clásicos del rock.",
      date: "5 de septiembre, 2025",
      time: "21:00",
      price: 120,
      place: "Zaragoza",
    },
    {
      image: "/public/event1.jpg",
      title: "Concierto de Rap",
      description: "Las mejores batallas de rap del año.",
      date: "18 de septiembre, 2025",
      time: "10:00",
      price: 90,
      discount: 25,
      place: "Malaga",
    },
    {
      image: "/public/event2.jpg",
      title: "Festival de Música Electrónica",
      description: "Una noche de música electrónica épica.",
      date: "25 de octubre, 2025",
      time: "23:00",
      price: 140,
      place: "Madrid",
    },
  ];  

  const [visibleEvents, setVisibleEvents] = useState(5); // Number of visible concerts at the start

  // Function to load more concerts
  const loadMoreEvents = () => {
    setVisibleEvents((prev) => prev + 5); // Increment the cantity of the visible concerts
  };

  return (
    <div className="bg-white">
      {/* Show total of products and the visibles in the same line */}
      <div className="ml-10 mr-10 flex justify-between items-center text-lg font-semibold pt-8">
        <div>{events.length} Products</div>
        <div className="flex items-center gap-2">Show {visibleEvents} products <FaChevronDown /></div>
      </div>
  
      <div className="p-8 bg-white">
        {/* Show the concerts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {events.slice(0, visibleEvents).map((event, index) => (
            <EventCard
              key={index}
              image={event.image}
              title={event.title}
              description={event.description}
              place={event.place}
              date={event.date}
              time={event.time}
              price={event.price}
              discount={event.discount}
            />
          ))}
        </div>

        {/* Number of showing products item */}
        <div className="flex items-center justify-center m-4 mt-14 text-lg font-semibold">
          Showing {visibleEvents} of {events.length} products
        </div>

        {/* Progress Bar */}
        <div className="flex justify-center w-full mb-6">
          <div className="w-80 bg-gray-400 rounded-full h-2">
            <div className="bg-[rgb(60,60,60)] h-2 rounded-full" 
              style={{ width: `${(visibleEvents / events.length) * 100}%` }} // Dynamic filling
            ></div>
          </div>
        </div>

        {/* Show More Button */}
        {visibleEvents < events.length && (
          <div className="flex justify-center items-center mt-12 mb-8">
            <Button
              label={
                <>
                  <FaChevronDown className="inline-block mr-2" /> {/* Icon align to left */}
                  Show More
                </>
              }
              onClick={loadMoreEvents}
              className="bg-[rgb(60,60,60)] w-150 text-white text-lg font-semibold py-3 rounded-lg flex justify-center items-center"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;