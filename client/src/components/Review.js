import React, { useState } from "react";
import "./Review.css";

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const submitReview = (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim() || rating === 0) {
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
    <div className="review-page">
      <h2 className="review-title">Write a Review <span className="star-emoji">⭐</span></h2>

      <form className="review-card" onSubmit={submitReview}>
        <input
          className="input-name"
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="input-message"
          placeholder="Write your review..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="5"
        />

        <div className="rating-row" aria-label="Rating">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                className={`star-btn ${s <= rating ? "filled" : ""}`}
                onClick={() => setRating(s)}
                aria-label={`${s} star`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit Review
        </button>
      </form>

      <h2 className="review-title small">User Reviews</h2>

      <div className="reviews-grid">
        {reviews.length === 0 && <p className="no-reviews">No reviews yet — be first!</p>}

        {reviews.map((rev, idx) => (
          <div className="review-card-small" key={idx}>
            <div className="rev-header">
              <img src={rev.profile} alt="profile" className="rev-avatar" />
              <div>
                <h4 className="rev-name">{rev.name}</h4>
                <div className="rev-stars" aria-hidden>
                  {"★".repeat(rev.rating)}{" "}
                  <span className="rev-empty">{"☆".repeat(5 - rev.rating)}</span>
                </div>
              </div>
            </div>
            <p className="rev-message">{rev.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
