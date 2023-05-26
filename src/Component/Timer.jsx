import React, { useEffect, useState } from "react";

export const Timer = ({ timer }) => {
  const [second, setSecond] = useState(0);
  const [min, setMin] = useState(0);
  const [hour, setHour] = useState(0);

  let interval;

  useEffect(() => {
    if (timer) {
      interval = setInterval(() => {
        setSecond(second + 1);
        if (second === 59) {
          setMin(min + 1);
          setSecond(0);
        }
        if (min === 59) {
          setHour(hour + 1);
          setMin(0);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "right",
        color: "black",
      }}>
      <div style={{ padding: "10px", marginRight: "20px" }}>
        <h4 style={{ textAlign: "center" }}>
          {hour < 10 ? "0" + hour : hour}:{min < 10 ? "0" + min : min}:
          {second < 10 ? "0" + second : second}
        </h4>
      </div>
    </div>
  );
};
