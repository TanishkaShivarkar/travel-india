import { useState } from "react";
import "./Review.css";

export default function Review() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const submit = (e) => {
    e.preventDefault();
    if (!name || !msg || rating === 0) return alert("Fill all fields!");

    setReviews([{ name, msg, rating }, ...reviews]);
    setName("");
    setMsg("");
    setRating(0);
  };

  return (
    <div className="review-container">
      <div className="review-card">
        <h2>Write a Review ⭐</h2>

        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Write your review..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          ></textarea>

          <div className="stars">
            {[1,2,3,4,5].map((s) => (
              <span
                key={s}
                onClick={() => setRating(s)}
                className={s <= rating ? "active" : ""}
              >
                ★
              </span>
            ))}
          </div>

          <button type="submit">Submit Review</button>
        </form>
      </div>

      <h3 className="ur-title">User Reviews</h3>

      <div className="review-list">
        {reviews.length === 0 && <p>No reviews yet</p>}
        {reviews.map((r, i) => (
          <div className="review-item" key={i}>
            <h4>{r.name}</h4>
            <p className="stars-line">
              {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
            </p>
            <p>{r.msg}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
