import React, { useState } from "react";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function Calendar() {
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState(new Date().getDate());

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // luni = 0
  const totalDays = new Date(year, month + 1, 0).getDate();

  const days = [...Array(firstDay).fill(null), ...Array.from({ length: totalDays }, (_, i) => i + 1)];

  const changeMonth = (offset: number) => setDate(new Date(year, month + offset, 1));

  return (
    <div style={{ background: "#DDD6FE", borderRadius: 24, padding: 24, width: 300, fontFamily: "sans-serif", color: "#1E1B4B" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <button onClick={() => changeMonth(-1)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 20, color: "#1E1B4B" }}>‹</button>
        <strong>{MONTHS[month]} {year}</strong>
        <button onClick={() => changeMonth(1)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 20, color: "#1E1B4B" }}>›</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", rowGap: 8 }}>
        {DAYS.map((d, i) => <div key={i} style={{ fontWeight: "bold" }}>{d}</div>)}
        {days.map((day, i) => (
          <div
            key={i}
            onClick={() => day && setSelected(day)}
            style={{
              cursor: day ? "pointer" : "default",
              borderRadius: "50%",
              width: 30,
              height: 30,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: day === selected ? "#A8A29E" : "transparent",
              fontWeight: 600,
            }}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
}