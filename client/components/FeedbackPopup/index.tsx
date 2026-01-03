"use client";

import React, { useState, useEffect } from "react";
import { X, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { UserRating } from "../../../shared/src/types";

type FeedbackProps = {
  targetName: string;
  rating: UserRating;
  onRating: (rating: number, message: string) => void;
  onClose: () => void;
};

type FeedbackType = "plus" | "minus" | null;

const FeedbackTypeDict: Record<number, FeedbackType> = {
  "-1": "minus",
  1: "plus",
};

const RatingDict: Record<string, number> = {
  plus: 1,
  minus: -1,
};

const isMobileSize = () =>
  typeof window !== "undefined" && window.innerWidth < 640;

const FeedbackPopup = ({
  targetName,
  rating,
  onRating,
  onClose,
}: FeedbackProps) => {
  const [type, setType] = useState<FeedbackType>(
    rating ? FeedbackTypeDict[rating.rating] : null
  );
  const [comment, setComment] = useState<string>(rating?.comment || "");
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type) return;
    onRating(RatingDict[type], comment);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Nội dung Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-300 overflow-hidden">
        {/* Nút thoát */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-8 md:p-10 text-center animate-in fade-in duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-50 text-green-500 mb-4">
              <ThumbsUp size={isMobileSize() ? 24 : 32} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-800">
              Cảm ơn bạn!
            </h3>
            <p className="text-slate-500 mt-2 text-sm md:text-base px-2 leading-relaxed">
              Đánh giá của bạn giúp cộng đồng tin cậy{" "}
              <span className="font-semibold text-slate-700">{targetName}</span>{" "}
              hơn.
            </p>
            <button
              onClick={onClose}
              className="mt-8 w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
            >
              Đóng cửa sổ
            </button>
          </div>
        ) : (
          <div className="p-5 md:p-8">
            <div className="flex items-center gap-2 mb-5 md:mb-6">
              <MessageSquare size={20} className="text-blue-500" />
              <h2 className="text-lg md:text-xl font-bold text-slate-800">
                Trải nghiệm của bạn?
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              {/* Nút chọn hài lòng / không hài lòng */}
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

              {/* Textarea */}
              <div className="space-y-2">
                <label
                  htmlFor="popup-comment"
                  className="block text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest"
                >
                  Nhận xét chi tiết
                </label>
                <textarea
                  value={comment}
                  id="popup-comment"
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 md:p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none text-sm md:text-base text-slate-700 placeholder:text-slate-300"
                  placeholder="Chia sẻ lý do bạn hài lòng hoặc chưa hài lòng..."
                  rows={isMobileSize() ? 3 : 4}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!type}
                className={`w-full py-3.5 md:py-4 rounded-xl font-bold text-white transition-all transform active:scale-[0.98] shadow-lg ${
                  type
                    ? "bg-blue-600 hover:bg-blue-700 shadow-blue-100"
                    : "bg-slate-200 cursor-not-allowed text-slate-400 shadow-none"
                }`}
              >
                Gửi đánh giá ngay
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPopup;
