"use client";

import React from "react";
import Lottie from "lottie-react";
import checkAnimation from "@/public/Success.json";
import FeedbackBox from "@/components/FeedbackBox";
import {
  CreateRating,
  Order,
  UserRating,
} from "../../../../../../shared/src/types";
import { RatingHook } from "@/hooks/useRating";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ChevronRight, PartyPopper } from "lucide-react";
import Link from "next/link";

type PageProps = {
  order: Order;
};

const FinishStep = ({ order }: PageProps) => {
  const { data: rating, isLoading: isLoadingRating } =
    RatingHook.useGetOneRating(order?.buyer?.id, order?.seller?.id) as {
      data: UserRating;
      isLoading: boolean;
    };

  const { mutate: createRating } = RatingHook.useCreateRating();
  const { mutate: updateRating } = RatingHook.useUpdateRating();

  const handleRatingBuyer = (ratingPoint: number, message: string) => {
    if (!order.buyer.id || !order.seller.id) return;
    const newRating: CreateRating = {
      ratee: order.seller,
      rating: ratingPoint,
      comment: message,
    };

    if (!rating) createRating(newRating);
    else updateRating(newRating);
  };

  return (
    <div className="max-w-[600px] mx-auto py-6 md:py-10 px-2 md:px-4 space-y-6 md:space-y-10 animate-in fade-in zoom-in duration-500 flex flex-col items-center">
      {/* Phần chúc mừng */}
      <div className="flex flex-col items-center text-center space-y-2 md:space-y-4 px-4">
        <div className="relative inline-block">
          <Lottie
            animationData={checkAnimation}
            loop={false}
            className="w-24 h-24 md:w-32 md:h-32" // Thu nhỏ trên mobile
          />
          <div className="absolute top-0 -right-1 bg-amber-100 p-1.5 md:p-2 rounded-full text-amber-600 shadow-sm animate-bounce">
            <PartyPopper className="w-4 h-4 md:w-5 md:h-5" />
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl md:text-3xl font-black text-slate-800 tracking-tight">
            Giao dịch thành công!
          </h2>
          <p className="text-slate-500 text-xs md:text-sm font-medium max-w-[280px] md:max-w-[350px] mx-auto leading-relaxed">
            Sản phẩm đã về tay bạn. Hãy để lại đánh giá cho{" "}
            <b>{order.seller.name}</b> nhé!
          </p>
        </div>
      </div>

      {isLoadingRating ? (
        <div className="relative h-24 md:h-32 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="w-full flex justify-center px-2">
          {/* Đảm bảo FeedbackBox chiếm chiều ngang tốt nhất trên Mobile */}
          <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-50 overflow-hidden">
            <FeedbackBox
              targetName={order.seller.name}
              rating={rating}
              onRating={handleRatingBuyer}
            />
          </div>
        </div>
      )}

      {/* Điều hướng - Tăng khoảng cách touch trên mobile */}
      <div className="pt-4 md:pt-6 flex flex-col items-center gap-4">
        <Link
          href="/user/winning_products"
          className="group flex items-center gap-1.5 text-[13px] md:text-sm text-blue-500 font-bold hover:text-blue-600 transition-colors p-2"
        >
          <span>Xem đơn hàng khác</span>
          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default FinishStep;
