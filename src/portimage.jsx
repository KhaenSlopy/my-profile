import React, { useState, useEffect, useRef } from "react";
import {
  IoCaretBackCircleOutline,
  IoCaretForwardCircleOutline,
} from "react-icons/io5";

import mobile_iot from "./assets/png/mobile_iot.png";
import sensor_iot from "./assets/png/sensor_iot.png";   
import system_iot from "./assets/png/system_iot.png";
import web from "./assets/png/web.png";
import web_senoirproject from "./assets/png/web_senoirproject.png";
import poerfolio from "./assets/png/poerfolio.png";


const items = [
  {
    id: 1,
    title: "Website - Senior Project",
    category: "web",
    // img: "../public/assets/web_senoirproject.png",
    img:{web_senoirproject}
  },
  {
    id: 2,
    title: "Dashborad Sensor IOT (Mobile)",
    category: "mobile",
    // img: "../public/assets/mobile_iot.png",
    img: {mobile_iot},
  },
  {
    id: 3,
    title: "IOT SmartFarm",
    category: "iot",
    // img: "../public/assets/system_iot.png",
    img: {system_iot},
  },
  {
    id: 4,
    title: "Web Temp Slopy",
    category: "web",
    // img: "../public/assets/web.png",
    img: {web},
  },
  {
    id: 5,
    title: "Sensor IoT SmartFarm",
    category: "iot",
    // img: "../public/assets/sensor_iot.png",
    img: {sensor_iot},
  },
  {
    id: 6,
    title: "Training",
    category: "iot",
    // img: "../public/assets/poerfolio.png",
    img: {poerfolio},
  },
];

const categories = ["all", "web", "mobile", "iot"];

export default function PortImage({
  autoplay = true,
  autoplayInterval = 4000,
}) {
  const [filter, setFilter] = useState("all");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const filtered = items.filter((it) =>
    filter === "all" ? true : it.category === filter
  );
  const slideCount = filtered.length;
  const autoplayRef = useRef();

  useEffect(() => {
    autoplayRef.current = () => setIndex((i) => (i + 1) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    if (!autoplay || slideCount <= 1 || paused) return;
    const id = setInterval(() => autoplayRef.current(), autoplayInterval);
    return () => clearInterval(id);
  }, [autoplay, autoplayInterval, paused, slideCount]);

  useEffect(() => setIndex(0), [filter]);

  const prev = () => setIndex((i) => (i - 1 + slideCount) % slideCount);
  const next = () => setIndex((i) => (i + 1) % slideCount);
  const goTo = (i) => setIndex(i % slideCount);

  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const onTouchEnd = () => {
    const dx = touchStartX.current - touchEndX.current;
    if (dx > 50) next();
    else if (dx < -50) prev();
  };

  if (!slideCount)
    return <div className="p-6 text-center">No works found.</div>;

  return (
    <div
      className="max-w-6xl w-full p-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full border transition ${
              filter === c
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
            }`}
          >
            {c === "all" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          className="overflow-hidden rounded-xl"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex  transition-transform duration-500"
            style={{
              width: `${slideCount * 100}%`,
              transform: `translateX(-${(index * 100) / slideCount}%)`,
            }}
          >
            {filtered.map((it) => (
              <div
                key={it.id}
                className="w-full h-full flex-shrink-0"
                style={{ width: `${100 / slideCount}%` }}
              >
                <div className="relative" style={{ paddingTop: "56.25%" /* 16:9 ratio */ }}>
                  <img
                    src={it.img}
                    alt={it.title}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                    <h3 className="text-lg font-semibold">{it.title}</h3>
                    <p className="text-sm uppercase opacity-80">
                      {it.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nav buttons */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/80 p-2 rounded-full shadow hover:scale-105 transition"
        >
          <IoCaretBackCircleOutline />
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/80 p-2 rounded-full shadow hover:scale-105 transition"
        >
          <IoCaretForwardCircleOutline />
        </button>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {filtered.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === index ? "bg-teal-600" : "bg-gray-300 dark:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
