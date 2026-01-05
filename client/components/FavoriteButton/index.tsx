"use client";

import React, { useEffect, useState } from "react";
import { LoveFullIcon, LoveIcon } from "../icons";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onClick?: () => void;
};

export default function FavoriteButton({
  isFavorite = false,
  onClick,
}: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState<boolean>(isFavorite);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const handleClick = (e: React.MouseEvent) => {
    // Ngăn chặn sự kiện click lan ra ngoài làm ảnh hưởng đến Product Card
    e.preventDefault();
    e.stopPropagation();

    setFavorite(!favorite);
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-8 h-8 cursor-pointer flex items-center justify-center transition-transform hover:scale-110 active:scale-90"
    >
      <div className="relative w-full h-full flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
        {/* LoveIcon (Viền trắng, ruột xám trong suốt khi chưa chọn) */}
        <LoveIcon
          className={`absolute w-8 h-8 transition-all duration-300 ${
            favorite
              ? "opacity-0 scale-50"
              : "opacity-100 scale-100 text-white fill-gray-400/60"
          }`}
        />

        {/* LoveFullIcon (Màu đỏ rực khi đã chọn) */}
        <LoveFullIcon
          className={`absolute w-8 h-8 transition-all duration-300 ${
            favorite
              ? "opacity-100 scale-100 text-red-500"
              : "opacity-0 scale-50"
          }`}
        />
      </div>
    </div>
  );
}
