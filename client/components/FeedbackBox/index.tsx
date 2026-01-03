"use client";

import React, { useState } from "react";
import { UserRating } from "../../../shared/src/types";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";

type FeedbackType = "plus" | "minus" | null;

type FeedbackProps = {
  targetName: string;
  rating: UserRating;
  onRating: (rating: number, message: string) => void;
};

const FeedbackTypeDict: Record<number, FeedbackType> = {
  "-1": "minus",
  1: "plus",
};

const RatingDict: Record<string, number> = {
  plus: 1,
  minus: -1,
};

const FeedbackBox = ({ targetName, rating, onRating }: FeedbackProps) => {
  const [type, setType] = useState<FeedbackType>(
    rating ? FeedbackTypeDict[rating.rating] : null
  );
  const [comment, setComment] = useState<string>(rating?.comment || "");
  const [submitted, setSubmitted] = useState<boolean>(!!rating);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full p-6 md:p-8 bg-white md:rounded-xl md:shadow-lg text-center border border-gray-100 rounded-lg shadow-md shadow-slate-100 animate-in fade-in duration-300">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-green-500 mb-4">
          <ThumbsUp size={24} />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-slate-800">
          Cảm ơn bạn!
        </h3>
        <p className="text-gray-500 mt-2 text-sm md:text-base px-4">
          Đánh giá của bạn giúp cộng đồng tin cậy {targetName} hơn.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-blue-500 font-semibold hover:text-blue-600 text-xs md:text-sm uppercase tracking-wider"
        >
          Chỉnh sửa đánh giá
        </button>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-6 bg-white md:rounded-xl borderrounded-lg shadow-md rounded-lg border-gray-100">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <MessageSquare size={18} className="text-blue-500" />
        <h2 className="text-base md:text-lg font-bold text-slate-800">
          Trải nghiệm của bạn?
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* Nút chọn + hoặc - */}
        <div className="flex gap-3 md:gap-4">
          <button
            type="button"
            onClick={() => setType("plus")}
            className={`flex-1 py-3 md:py-4 rounded-xl border-2 transition-all flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 ${
              type === "plus"
                ? "border-green-500 bg-green-50 text-green-600 shadow-sm shadow-green-100"
                : "border-slate-100 bg-slate-50/50 text-slate-400 hover:border-green-200"
            }`}
          >
            <ThumbsUp
              size={isMobileSize() ? 18 : 20}
              className={type === "plus" ? "animate-bounce" : ""}
            />
            <span className="text-[11px] md:text-sm font-bold uppercase tracking-tight">
              Hài lòng
            </span>
          </button>

          <button
            type="button"
            onClick={() => setType("minus")}
            className={`flex-1 py-3 md:py-4 rounded-xl border-2 transition-all flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 ${
              type === "minus"
                ? "border-red-500 bg-red-50 text-red-600 shadow-sm shadow-red-100"
                : "border-slate-100 bg-slate-50/50 text-slate-400 hover:border-red-200"
            }`}
          >
            <ThumbsDown size={isMobileSize() ? 18 : 20} />
            <span className="text-[11px] md:text-sm font-bold uppercase tracking-tight">
              Chưa tốt
            </span>
          </button>
        </div>
        {/* Dòng comment */}
        <div className="space-y-2">
          <label
            htmlFor="comment"
            className="block text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest"
          >
            Nhận xét chi tiết
          </label>
          <textarea
            value={comment}
            id="comment"
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 md:p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none text-sm md:text-base text-slate-700 placeholder:text-slate-300"
            placeholder="Chia sẻ lý do bạn hài lòng hoặc chưa hài lòng..."
            rows={isMobileSize() ? 2 : 3}
          />
        </div>
        {/* Nút gửi */}
        <button
          type="submit"
          onClick={() => onRating(RatingDict[type!], comment)}
          disabled={!type}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
            type
              ? "bg-blue-600 hover:bg-blue-700 shadow-md"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Gửi đánh giá
        </button>
      </form>
    </div>
  );
};

// Helper để check size nhanh trong component nếu cần (Optional)
const isMobileSize = () =>
  typeof window !== "undefined" && window.innerWidth < 640;

export default FeedbackBox;
