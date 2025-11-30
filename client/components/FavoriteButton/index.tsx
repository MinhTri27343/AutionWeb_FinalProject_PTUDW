"use client";

import React from "react";
import { useState } from "react";
import { LoveFullIcon, LoveIcon } from "../icons";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onClick?: (favorite: boolean) => void;
};
// favorite
export default function FavoriteButton({
  isFavorite = false,
  onClick,
}: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState<boolean>(isFavorite);

  const handleClick = () => {
    const newValue = !favorite;
    setFavorite(newValue);
    if (onClick) onClick(newValue);
  };

  return (
    <div
      className="relative w-8 h-8 cursor-pointer rounded-full bg-black/50 flex items-center justify-center"
      onClick={handleClick}
    >
      {/* Outline icon */}
      <LoveIcon
        className={`absolute text-white transition-opacity duration-200 ${
          favorite ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Filled icon */}
      <LoveFullIcon
        className={`absolute text-red transition-opacity duration-200 ${
          favorite ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
