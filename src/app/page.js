"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const res = await fetch(`/api/weather?city=${city}`);

      // Cek status respon dari server
      if (!res.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setWeather(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        style={{ padding: "10px", marginBottom: "10px" }}
      />
      <button onClick={fetchWeather} style={{ padding: "10px" }}>
        Get Weather
      </button>
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.temp}°C</p>
        </div>
      )}
    </div>
  );
}
