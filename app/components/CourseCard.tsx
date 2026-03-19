"use client";

import Image from "next/image";
import { useState } from "react";

export default function CourseCard({
  title,
  price,
  lessons,
  img,
  content,
}: {
  title: string;
  price: string;
  lessons: string;
  img: string;
  content: string[];
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={{
        perspective: "1000px",
        width: "350px",
        height: "320px"
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transition: "transform 0.5s",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            background: "#fafafa",
            borderRadius: "12px",
            padding: "16px",
            border: "1px solid #e5e5e5",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Image
            src={img}
            alt="course"
            width={150}
            height={120}
            style={{
              borderRadius: "8px",
              display: "block",
              margin: "0 auto",
              objectFit: "cover",
              height: "120px",
            }}
          />

          <h3 style={{ fontWeight: "bold", marginTop: "10px", color: "#264653" }}>
            {title}
          </h3>

          <div style={{ width: "100%", marginTop: "8px" }}>
            <span style={{ float: "left", color: "#264653" }}>
              {lessons}
            </span>
            <span style={{ float: "right", color: "#E76F51" }}>
              {price}
            </span>
          </div>

          <button
            onClick={() => setFlipped(true)}
            style={{
              marginTop: "40px",
              width: "100%",
              background: "#2a4d60",
              color: "white",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            View Course
          </button>
        </div>

        {/* BACK */}
        <div
              style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "#264653",
              color: "white",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",

              display: "flex",
              flexDirection: "column",
            }}
        >
          <h2 className="font-bold text-[#47a599]">{title}</h2>

          <p>Con este curso aprenderás:</p>

        <div style={{ flex: 1 }}>
          {content.map((item, i) => (
            <p key={i}>• {item}</p>
          ))}
        </div>



          <button
            onClick={() => setFlipped(false)}
            style={{
              marginTop: "20px",
              width: "100%",
              background: "#47a599",
              color: "white",
              padding: "10px",
              borderRadius: "8px",
              border: "#47a599",
              cursor: "pointer",
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}