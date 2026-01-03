import React from "react";
import { User, UserCheck } from "lucide-react";
import { Order, Product } from "../../../../../../../shared/src/types";
import Image from "next/image";

type ComponentProps = {
  product: Product;
  order: Order;
};

const OrderInfoCard = ({ order }: ComponentProps) => {
  const buyerRating = Math.ceil(
    (100.0 * order.buyer.positive_points) /
      (order.buyer.positive_points + order.buyer.negative_points) || 0
  );

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm w-full transition-all hover:border-teal-500">
      <div className="p-2 sm:p-3 flex items-center gap-3">
        {/* Avatar nhỏ gọn hơn */}
        <div className="relative shrink-0">
          {order.buyer.profile_img ? (
            <Image
              src={order.buyer.profile_img}
              alt={order.buyer.name}
              width={40}
              height={40}
              className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full border border-slate-100"
            />
          ) : (
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
            </div>
          )}
        </div>

        {/* Thông tin nén lại theo chiều dọc */}
        <div className="flex flex-col min-w-0 leading-tight">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate">
              {order.buyer.name}
            </h3>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-teal-50 border border-teal-100 text-[8px] sm:text-[9px] font-bold text-teal-600 uppercase tracking-tighter shrink-0">
              <UserCheck className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
              Người mua
            </span>
          </div>

          <div className="flex items-center mt-0.5">
            <span className="text-[11px] sm:text-xs font-semibold text-teal-600">
              ⭐ {buyerRating > 0 ? `${buyerRating}%` : `Chưa có đánh giá`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoCard;
