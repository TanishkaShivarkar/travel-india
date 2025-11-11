import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

function App() {
  const [destinations, setDestinations] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

 
  const fetchDestinations = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/destinations");
      const data = await res.json();
      console.log("Fetched data:", data);
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
    if (!title || !description) return alert("Please fill all fields!");

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
      } else {
        console.error("Failed to add destination");
      }
    } catch (error) {
      console.error("Error adding destination:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🧭 Travel India</h1>
      <p>Explore beautiful destinations across India 🇮🇳</p>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Destination Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "0.5rem", margin: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: "0.5rem", margin: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={{ padding: "0.5rem", margin: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Add Destination
        </button>
      </form>

      {destinations.length === 0 ? (
        <p>No destinations yet. Add one!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {destinations.map((d) => (
            <li key={d._id} style={{ margin: "1rem 0" }}>
              <h2>{d.title}</h2>
              <p>{d.description}</p>
              {d.image && (
                <img
                  src={d.image}
                  alt={d.title}
                  style={{ width: "300px", borderRadius: "10px" }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
