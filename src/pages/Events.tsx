import React, { useState } from "react";
import EventCard from "../components/EventCard";
import { Button } from "../components/Button"; // Asegúrate de importar el botón
import Footer from "../components/Footer"; // Asegúrate de importar el Footer

const Events: React.FC = () => {
  const events = [
    {
      image: "/public/event1.jpg",
      title: "Concierto de Rock",
      description: "Un concierto increíble con las mejores bandas.",
      date: "22 de abril, 2025",
      price: 119,
      discount: 20,
    },
    {
      image: "/public/event2.jpg",
      title: "Festival de Jazz",
      description: "Vive la magia del jazz en el festival anual.",
      date: "10 de mayo, 2025",
      price: 95,
    },
    {
      image: "/public/event1.jpg",
      title: "Concierto de Pop",
      description: "Un pop fest con los artistas más famosos.",
      date: "30 de mayo, 2025",
      price: 110,
      discount: 10,
    },
    {
      image: "/public/event2.jpg",
      title: "Festival de Electrónica",
      description: "Disfruta de los DJ más populares.",
      date: "15 de junio, 2025",
      price: 125,
    },
    {
      image: "/public/event1.jpg",
      title: "Concierto de Metal",
      description: "Un concierto de los mejores grupos de metal.",
      date: "1 de julio, 2025",
      price: 130,
      discount: 15,
    },
    {
      image: "/public/event2.jpg",
      title: "Festival de Reggaetón",
      description: "El festival con los artistas más calientes.",
      date: "10 de agosto, 2025",
      price: 100,
    },
    {
      image: "/public/event1.jpg",
      title: "Concierto de Indie",
      description: "Una experiencia única con música indie.",
      date: "22 de agosto, 2025",
      price: 105,
      discount: 5,
    },
    {
      image: "/public/event2.jpg",
      title: "Festival de Rock Clásico",
      description: "Los mejores clásicos del rock en un solo evento.",
      date: "5 de septiembre, 2025",
      price: 120,
    },
    {
      image: "/public/event1.jpg",
      title: "Concierto de Rap",
      description: "Las mejores batallas de rap del año.",
      date: "18 de septiembre, 2025",
      price: 90,
      discount: 25,
    },
    {
      image: "/public/event2.jpg",
      title: "Festival de Música Electrónica",
      description: "Una noche de música electrónica épica.",
      date: "25 de octubre, 2025",
      price: 140,
    },
  ];

  const [visibleEvents, setVisibleEvents] = useState(6); // Número de conciertos visibles inicialmente

  // Función para cargar más conciertos
  const loadMoreEvents = () => {
    setVisibleEvents((prev) => prev + 6); // Incrementa la cantidad de conciertos visibles
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow p-8">
        {/* Mostrar los conciertos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {events.slice(0, visibleEvents).map((event, index) => (
            <EventCard
              key={index}
              image={event.image}
              title={event.title}
              description={event.description}
              date={event.date}
              price={event.price}
              discount={event.discount}
            />
          ))}
        </div>

        {/* Botón Show More */}
        {visibleEvents < events.length && (
          <div className="flex justify-center mt-8">
            <Button label="Show More" onClick={loadMoreEvents} />
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Events;