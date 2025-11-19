import React, { useEffect } from "react";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el, index) => {
      setTimeout(() => el.classList.add("visible"), index * 300);
    });
  }, []);

  return (
    <div className="home-container">
      
    
      <section className="hero-section fade-in">
        <h1 className="hero-title">Explore India Like Never Before 🇮🇳</h1>
        <p className="hero-subtitle">
          Discover destinations, cultures, food, and adventures across India.
        </p>

        <button
          className="explore-btn"
          onClick={() => {
            window.location.href = "/destinations";
          }}
        >
          Start Exploring
        </button>
      </section>

      
      <section className="features-section fade-in">
        <h2>Why Travel India?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>🌄 Beautiful Places</h3>
            <p>Discover mountains, beaches, forests, and hidden gems.</p>
          </div>

          <div className="feature-card">
            <h3>🍛 Amazing Food</h3>
            <p>Experience mouth-watering dishes from every region.</p>
          </div>

          <div className="feature-card">
            <h3>🎭 Rich Culture</h3>
            <p>Explore festivals, traditions, and diverse communities.</p>
          </div>

          <div className="feature-card">
            <h3>💸 Budget Friendly</h3>
            <p>Plan trips easily with affordable options.</p>
          </div>
        </div>
      </section>

     
      
    </div>
  );
};

export default Home;
