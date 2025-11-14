import React, { useEffect, useState } from "react";
import "./Destinations.css";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Fetch data from backend
  const fetchDestinations = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/destinations");
      const data = await res.json();
      setDestinations(data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Fill all fields!");

    const newDestination = { title, description, image };

    try {
      const res = await fetch("http://localhost:5000/api/destinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDestination),
      });

      if (res.ok) {
        setTitle("");
        setDescription("");
        setImage("");
        fetchDestinations();
      }
    } catch (error) {
      console.error("Error adding destination:", error);
    }
  };

  return (
    <div className="dest-container">
      
      <h1 className="dest-title">Top Destinations in India 🌍</h1>
      <p className="dest-subtitle">Add & explore the best travel spots!</p>

      <form className="dest-form" onSubmit={handleSubmit}>
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

        <button type="submit">Add Destination</button>
      </form>

      <div className="dest-grid">
        {destinations.length === 0 ? (
          <p className="no-data">No destinations yet. Add one!</p>
        ) : (
          destinations.map((d) => (
            <div className="dest-card" key={d._id}>
              <img src={d.image || "https://via.placeholder.com/300"} alt={d.title} />
              <h3>{d.title}</h3>
              <p>{d.description}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Destinations;
