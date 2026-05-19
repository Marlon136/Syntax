"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/providers/LanguageProvider";

export default function CourseCard({
  slug,
  title,
  price,
  lessons,
  img,
  content,
  completed,
}: {
  slug: string;
  title: string;
  price: string;
  lessons: string;
  img: string;
  content: string[];
  completed?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const { t } = useLanguage();
  const moreInfoLabelRaw = t("courseCard.moreInfo");
  const backLabelRaw = t("courseCard.back");
  const moreInfoLabel = typeof moreInfoLabelRaw === "string" && moreInfoLabelRaw.includes(".") ? "Más información" : moreInfoLabelRaw;
  const backLabel = typeof backLabelRaw === "string" && backLabelRaw.includes(".") ? "Volver" : backLabelRaw;
  const router = useRouter();

  return (
    <div
      style={{
        perspective: "1000px",
        width: "100%",
        maxWidth: "350px",
        minHeight: "320px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          minHeight: "320px",
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

          <div style={{ position: 'absolute', left: 16, right: 16, bottom: 16 }}>
            <button
              type="button"
              onClick={() => setFlipped(true)}
              className="w-full rounded-lg bg-[#2a4d60] px-4 py-2 text-white transition hover:bg-[#47a599]"
            >
              {moreInfoLabel}
            </button>
          </div>
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

          <p>{t("courseCard.learnDetails")}</p>

          <div style={{ flex: 1 }}>
            {content.map((item, i) => (
              <p key={i}>• {item}</p>
            ))}
          </div>



          <button
            onClick={() => setFlipped(false)}
            className="mt-5 w-full rounded-lg bg-[#2a4d60] px-4 py-2 text-white transition hover:bg-[#47a599]"
          >
            {t("courseCard.back")}
          </button>
        </div>
      </div>
    </div>
  );
}