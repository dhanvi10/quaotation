"use client";

import { motion } from "framer-motion";

export function DgvclBadge() {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative mx-auto w-[92px] shrink-0"
    >
      <div
        className="absolute inset-0 rounded-full blur-md"
        style={{
          background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
          opacity: 0.45,
        }}
      />
      <div
        className="relative flex aspect-square flex-col items-center justify-center rounded-full border-2 p-2 text-center shadow-lg"
        style={{
          background: "linear-gradient(160deg, #fffbeb 0%, #fde68a 40%, #fcd34d 85%)",
          borderColor: "#d97706",
          boxShadow: "0 0 0 1px rgba(217,119,6,0.3), 0 8px 24px rgba(180,83,9,0.25)",
        }}
      >
        <div className="flex items-center gap-0.5">
          <span className="font-sans text-[10px] font-black tracking-wider text-emerald-800">
            DGVCL
          </span>
          <span className="text-sm leading-none">⚡</span>
        </div>
        <p className="mt-1 font-sans text-[6.5px] font-semibold leading-tight text-amber-950/90">
          Licence Approved
          <br />
          Electrical Contractor
          <br />
          Govt. of Gujarat
        </p>
      </div>
    </motion.div>
  );
}
