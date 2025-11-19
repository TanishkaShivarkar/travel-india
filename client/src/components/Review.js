import React, { useState } from "react";

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const submitReview = (e) => {
    e.preventDefault();

    if (!name || !message || rating === 0) {
      alert("Please fill all fields!");
      return;
    }

    const newReview = {
      name,
      message,
      rating,
      profile: `https://i.pravatar.cc/100?u=${name}`
    };

    setReviews([newReview, ...reviews]);

    setName("");
    setMessage("");
    setRating(0);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center" }}>Write a Review ⭐</h2>

     
      <form
        onSubmit={submitReview}
        style={{
          maxWidth: "400px",
          margin: "20px auto",
          background: "#F7CFD8",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <textarea
          placeholder="Write your review..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="3"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        ></textarea>

    
        <div style={{ marginBottom: "10px", fontSize: "1.5rem" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                cursor: "pointer",
                color: star <= rating ? "#FFD700" : "#ccc",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#ff5e62",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Submit Review
        </button>
      </form>

   
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>User Reviews</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {reviews.map((rev, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={rev.profile}
                alt="profile"
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "50%",
                }}
              />
              <h4 style={{ margin: 0 }}>{rev.name}</h4>
            </div>

            <p style={{ marginTop: "10px" }}>{rev.message}</p>

            <p style={{ color: "#FFD700", fontSize: "1.2rem" }}>
              {"★".repeat(rev.rating)}{" "}
              {"☆".repeat(5 - rev.rating)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
