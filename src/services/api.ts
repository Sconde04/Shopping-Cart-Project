// src/services/api.ts
export interface Event {
    id: string;
    image: string;
    title: string;
    description: string;
    date: string;
    time: string;
    place: string;
    price: number;
    discount?: number;
  }
  
  const API_URL = import.meta.env.VITE_API_URL as string;
  
  export async function fetchEvents(): Promise<Event[]> {
    const res = await fetch(`${API_URL}/concerts`);
    if (!res.ok) throw new Error("Failed to fetch events");
    return res.json();
  }