"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface DgvclBadgeProps {
  /** Scale factor for print contexts — defaults to 1 */
  scale?: number;
}

export function DgvclBadge({ scale = 1 }: DgvclBadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative inline-flex shrink-0 select-none"
      style={{ transform: `scale(${scale})`, transformOrigin: "top right" }}
      aria-label="DGVCL Licence Approved Electrical Contractor"
    >
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(251,191,36,0.55) 0%, rgba(217,119,6,0.18) 60%, transparent 80%)",
          filter: "blur(6px)",
          transform: "scale(1.18)",
        }}
        aria-hidden="true"
      />

      {/* Badge shell */}
      <div
        className="relative flex flex-col items-center justify-center rounded-full text-center"
        style={{
          width: 80,
          height: 80,
          background:
            "linear-gradient(160deg, #fffdf0 0%, #fef3c7 35%, #fde68a 65%, #fbbf24 100%)",
          border: "2px solid #d97706",
          padding: "6px 4px",
        }}
      >
        {/* Inner decorative ring */}
        <div
          className="absolute inset-[4px] rounded-full pointer-events-none"
          style={{
            border: "1px dashed rgba(180,83,9,0.35)",
          }}
          aria-hidden="true"
        />

        {/* DGVCL + lightning */}
        <div className="relative z-10 flex items-center gap-[2px] leading-none">
          <span
            style={{
              fontFamily: "var(--font-poppins), sans-serif",
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.08em",
              color: "#78350f",
              lineHeight: 1,
            }}
          >
            DGVCL
          </span>
          <Zap
            className="shrink-0"
            style={{
              width: 9,
              height: 9,
              color: "#b45309",
              fill: "#fbbf24",
              strokeWidth: 2,
            }}
          />
        </div>

        {/* Divider */}
        <div
          className="relative z-10 my-[3px]"
          style={{
            width: 44,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(180,83,9,0.5), transparent)",
          }}
          aria-hidden="true"
        />

        {/* Text block */}
        <div
          className="relative z-10 flex flex-col items-center gap-[1px]"
          style={{
            fontFamily: "var(--font-poppins), sans-serif",
            fontSize: 6.5,
            fontWeight: 600,
            lineHeight: 1.35,
            color: "#92400e",
            letterSpacing: "0.02em",
          }}
        >
          <span>Licence Approved</span>
          <span>Electrical Contractor</span>
          <span
            style={{
              fontSize: 6,
              fontWeight: 700,
              color: "#78350f",
              letterSpacing: "0.04em",
            }}
          >
            Govt. of Gujarat
          </span>
        </div>
      </div>
    </motion.div>
  );
}
