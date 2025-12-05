"use client";

import { Trash2 } from "lucide-react";

export default function DeleteButton() {
  return (
    <div className="relative w-8 h-8 cursor-pointer flex items-center justify-center transition-all hover:bg-[#FEF3F3]">
      {/* Outline icon */}
      <Trash2
        className={`absolute text-red-500 transition-opacity duration-200  `}
        size={18}
      />
    </div>
  );
}
