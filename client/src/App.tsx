import { useState, useEffect } from "react";

export default function App() {
  const photos = [
    "/photos/1.jpg",
    "/photos/2.jpg",
    "/photos/3.jpg",
    "/photos/4.jpg",
    "/photos/5.jpg",
    "/photos/6.jpg",
    "/photos/7.jpg",
    "/photos/8.jpg",
    "/photos/9.jpg",
    "/photos/10.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(to bottom, #ff9a9e, #fad0c4)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "40px" }}>❤️ Moni ❤️</h1>
      <h3>Birthday: 12 January 🎂</h3>

      <div
        style={{
          width: "280px",
          height: "380px",
          marginTop: "20px",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        }}
      >
        <img
          src={photos[index]}
          alt="Moni"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <p style={{ marginTop: "20px", fontSize: "18px" }}>
        Every moment with you is special ❤️
      </p>

      <audio autoPlay loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
