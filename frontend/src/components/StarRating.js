import React, { useState, useEffect } from "react";

const StarRating = ({ value, onChange }) => {
  const [activeRating, setActiveRating] = useState(value);
  useEffect(() => {
    setActiveRating(value);
  }, [value]);
  return (
    <>
      {/* <input
        type="number"
        disabled={disabled}
        value={rating}
        onChange={onChange}
      /> */}
      <div className="rating-input">
        {[1, 2, 3, 4, 5].map((numStar) => (
          <div
            key={numStar}
            className={activeRating >= numStar ? "filled" : "empty"}
            // onMouseEnter={!disabled ? () => setActiveRating(numStar) : null}
            onMouseEnter={() => setActiveRating(numStar)}
            onMouseLeave={() => setActiveRating(value)}
            onClick={() => onChange(activeRating)}
          >
            <i className="fa-sharp fa-solid fa-star fa-sm"></i>
          </div>
        ))}
        <div>Stars</div>
      </div>
    </>
  );
};

export default StarRating;
