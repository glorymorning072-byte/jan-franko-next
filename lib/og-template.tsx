import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import { truncateTitle, truncateDescription } from "./seo";

export interface OgImageOptions {
  badge?: string;
  title: string;
  description?: string;
  ctaText?: string;
  bgType?: "expedition" | "workshop";
}

export function generateOgImageResponse({
  badge = "TRADITIONAL ARCHERY",
  title,
  description = "Structured traditional archery training, wilderness expeditions, and cultural study.",
  ctaText = "LEARN MORE →",
  bgType = "expedition",
}: OgImageOptions) {
  const safeTitle = truncateTitle(title, 57);
  const safeDesc = truncateDescription(description, 140);

  // Load background image as base64 data URL
  const bgFileName = bgType === "workshop" ? "og-bg-workshop.jpg" : "og-bg-expedition.jpg";
  const bgFilePath = path.join(process.cwd(), "public/images", bgFileName);
  const bgBuffer = fs.readFileSync(bgFilePath);
  const bgDataUrl = `data:image/jpeg;base64,${bgBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#051713",
        }}
      >
        {/* Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgDataUrl}
          alt="Background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            objectFit: "cover",
          }}
        />

        {/* Top-Left Dark Gradient Overlay for text contrast */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "820px",
            height: "630px",
            background: "linear-gradient(to right, rgba(5,23,19,0.92) 0%, rgba(5,23,19,0.75) 60%, rgba(5,23,19,0) 100%)",
            display: "flex",
          }}
        />

        {/* Outer Frame Border */}
        <div
          style={{
            position: "absolute",
            top: "24px",
            left: "24px",
            right: "24px",
            bottom: "24px",
            border: "1.5px solid rgba(197, 168, 128, 0.4)",
            borderRadius: "10px",
            display: "flex",
          }}
        />

        {/* Top-Left Content Area (Safe Zone) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            paddingTop: "60px",
            paddingLeft: "70px",
            maxWidth: "680px",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "6px 16px",
              backgroundColor: "rgba(197, 168, 128, 0.15)",
              border: "1px solid rgba(197, 168, 128, 0.5)",
              borderRadius: "4px",
              color: "#c5a880",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "3px",
              marginBottom: "16px",
            }}
          >
            {badge.toUpperCase()}
          </div>

          {/* Golden Title */}
          <div
            style={{
              fontSize: "44px",
              fontWeight: 700,
              color: "#c5a880",
              lineHeight: 1.2,
              fontFamily: "Georgia, serif",
              marginBottom: "14px",
              display: "flex",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            {safeTitle}
          </div>

          {/* Description */}
          {safeDesc && (
            <div
              style={{
                fontSize: "18px",
                color: "#f0e9d9",
                lineHeight: 1.45,
                marginBottom: "24px",
                display: "flex",
                opacity: 0.9,
              }}
            >
              {safeDesc}
            </div>
          )}

          {/* Golden CTA Button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 22px",
              backgroundColor: "#c5a880",
              borderRadius: "4px",
              color: "#051713",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "2px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            }}
          >
            {ctaText.toUpperCase()}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
