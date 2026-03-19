"use client";

import { useState } from "react";

import NavCourses from "../components/NavCourses";
import Python from "../components/displays/Python";
import Java from "../components/displays/Java";
import JS from "../components/displays/JS";

export default function CoursesDisplay() {
  const [view, setView] = useState("java");

  return (
    <div style={{ padding: "20px" }}>

      <div
        style={{
          border: "1px solid #f0a262",
          borderRadius: "10px",
          padding: "20px",
          marginTop: "20px",
          minHeight: "500px",
          background: "#fff8f3",
        }}
      >
         <NavCourses setView={setView} />

        {view === "java" && <Java/>}
        {view === "python" && <Python/>}
        {view === "js" && <JS/>}
      </div>

    </div>
  );
}