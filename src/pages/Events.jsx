import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/Event/EventCard";

export default function Events() {
  const [events, setEvents] = useState([]);
  const categories = [
    "Tümü",
    "Çevre",
    "Eğitim",
    "Sağlık",
    "Hayvanlar",
    "Afet",
    "Çocuk",
    "Yaşlı",
    "Su",
  ];

  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data.events || data));
  }, []);


  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "Tümü" || event.category === selectedCategory;
    const matchesSearch = searchQuery
      ? event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="page-container">
      {/* Header */}
      <div className="header-wrapper flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="header-badge">Aktif Projeler</span>
          <h1 className="header-title">Sosyal Sorumluluk Etkinlikleri</h1>
          <p className="header-desc max-w-xl">
            Seçtiğiniz kategorilere göre filtreleyebilir, dilediğiniz etkinliğe
            bağış yapabilir veya gönüllü olarak katılabilirsiniz.
          </p>
        </div>
        <Link to="/payment" className="btn btn-accent shrink-0">
          <svg
            className="w-4 h-4 mr-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          Cüzdana Para Yükle
        </Link>
      </div>

      <div className="filter-bar">
        <div className="filter-btn-group">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={
                selectedCategory === cat ? "filter-btn-active" : "filter-btn"
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-input-wrapper">
          <svg
            className="search-input-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Etkinlik ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid-cols-responsive-4">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center py-16 border border-dashed border-slate-200 rounded-3xl text-slate-400 text-sm">
          <svg
            className="w-12 h-12 text-slate-300 mx-auto mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-semibold text-slate-500">
            Bu kriterlere uygun etkinlik bulunamadı.
          </p>
        </div>
      )}
    </div>
  );
}
