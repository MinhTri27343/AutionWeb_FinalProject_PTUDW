"use client";

import { FC, useState, ChangeEvent, KeyboardEvent } from "react";
import Image from "next/image";
// import { SearchIcon } from "../icons";
// import ProductHook from "@/hooks/useProduct";
import { SearchProduct } from "../../../shared/src/types";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import ProductHook from "@/hooks/useProduct";

const defaultImage =
  "https://img.freepik.com/premium-photo/white-colors-podium-abstract-background-minimal-geometric-shape-3d-rendering_48946-113.jpg?semt=ais_hybrid&w=740&q=80";

export const SearchBar = () => {
  const router = useRouter();
  const per_page = 10;
  const [query, setQuery] = useState("");
  const {
    data: suggestionData,
    isLoading: isLoadingSuggestion,
    error: isErrorSuggestion,
  } = ProductHook.useGetProductsBySearchSuggestion(query, per_page) as {
    data: SearchProduct[];
    isLoading: boolean;
    error: any;
  };
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.length > 0) {
      router.push(`/product/search?query=${query}`);
      setShowSuggestions(false);
      setQuery("");
    }
  };

  const handleSuggestionClick = (item: SearchProduct) => {
    router.push(`/product/${item.slug}`);
    setShowSuggestions(false);
    setQuery("");
  };

  const handleSearchClick = () => {
    router.push(`/search?query=${query}`);
    setShowSuggestions(false);
    setQuery("");
  };

  return (
    <>
      <div className="relative w-full">
        {/* Input + nút Search */}
        <div className="flex relative ">
          <button>
            <Search className="absolute top-[11px] l-1 w-5 h-5 left-2.5" />
          </button>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={"Tìm kiếm sản phẩm ..."}
            className="flex-1 p-2 pl-10 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg"
          />
        </div>
      </div>
    </>
  );
};