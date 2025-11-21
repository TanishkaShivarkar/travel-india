import React, { useEffect, useState, useCallback } from "react";
import "./Destinations.css";


const DEFAULT_IMG = "/mnt/data/Screenshot 2025-11-21 223039.png";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchDestinations = useCallback(async (search = "") => {
    try {
      setLoading(true);
      const base = "http://localhost:5000/api/destinations";
      const url = search ? `${base}?search=${encodeURIComponent(search)}` : base;
      const res = await fetch(url);
      const data = await res.json();
      setDestinations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);


  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return alert("Please provide title and description.");

    const newDest = { title: title.trim(), description: description.trim(), image: image.trim() };

    try {
      const res = await fetch("http://localhost:5000/api/destinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDest),
      });

      if (res.ok) {
        setTitle(""); setDescription(""); setImage("");
       
        fetchDestinations(query.trim());
      } else {
        const text = await res.text();
        console.error("Add failed:", text);
        alert("Failed to add destination (check server).");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding destination. See console.");
    }
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    fetchDestinations(query.trim());
  };


  const filtered = query.trim() === ""
    ? destinations
    : destinations.filter(d =>
        (d.title || "").toLowerCase().includes(query.toLowerCase()) ||
        (d.description || "").toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="dest-container">
      <h1 className="dest-title">Top Destinations in India 🌍</h1>
      <p className="dest-subtitle">Search or add places — click a card to view details.</p>

      <div className="controls-row">
 
        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-input"
            placeholder="Search cities, landmarks, states..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="add-btn search-btn" onClick={handleSearch}>Search</button>
        </form>

   
        <form className="dest-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Destination Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <button type="submit" className="add-btn">Add Destination</button>
        </form>
      </div>

      <div className="dest-grid">
        {loading && <p className="info">Loading...</p>}

        {!loading && filtered.length === 0 && (
          <p className="no-data">No destinations found. Try a different search or add one!</p>
        )}

        {filtered.map((d) => (
          <div className="dest-card" key={d._id || d.id || d.title}>
            <img src={d.image || DEFAULT_IMG} alt={d.title} />
            <h3>{d.title}</h3>
            <p>{d.description}</p>
            <div className="card-actions">
              <button onClick={() => setSelected(d)} className="view-btn">View More</button>
            </div>
          </div>
        ))}
      </div>

     
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            <img className="modal-img" src={selected.image || DEFAULT_IMG} alt={selected.title} />
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>
            <a
              className="map-link"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected.title)}`}
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
