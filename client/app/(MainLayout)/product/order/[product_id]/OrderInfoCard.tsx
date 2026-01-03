import React from "react";
import { Clock, CheckCircle2, User, ShieldCheck } from "lucide-react";
import { Order, Product } from "../../../../../../shared/src/types";
import Image from "next/image";

type ComponentProps = {
  product: Product;
  order: Order;
};

const OrderInfoCard = ({ product, order }: ComponentProps) => {
  const sellerRating = Math.ceil(
    (100.0 * product.seller.positive_points) /
      (product.seller.positive_points + product.seller.negative_points) || 0
  );

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm w-full transition-all hover:border-blue-500">
      {/* Phần thân trên: Avatar & Tên */}
      <div className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
        <div className="relative shrink-0">
          {product.seller.profile_img ? (
            <Image
              src={product.seller.profile_img}
              alt={`Ảnh đại diện của ${product.seller.name}`}
              width={56}
              height={56}
              className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-full border border-slate-100 shadow-sm"
            />
          ) : (
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
            </div>
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
            <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-tight truncate max-w-[150px] sm:max-w-none">
              {product.seller.name}
            </h3>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-[9px] sm:text-[10px] font-bold text-blue-600 uppercase tracking-wider shrink-0">
              <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-blue-600/10" />
              Người bán
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-xs sm:text-sm font-semibold text-blue-600">
              {`⭐ ${
                sellerRating > 0 ? `${sellerRating}%` : `Chưa có đánh giá`
              }`}
            </span>
          </div>
        </div>
      </div>

      {/* Phần thân dưới: Thông tin thời gian */}
      <div className="flex flex-wrap bg-slate-50/50">
        {/* Cột 1: Đơn tạo lúc */}
        <div className="flex-1 min-w-[160px] sm:min-w-[200px] flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4">
          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-bold tracking-wider">
              Đơn tạo lúc
            </span>
            <span className="text-xs sm:text-sm text-slate-700 font-medium whitespace-nowrap">
              {new Date(order.created_at).toLocaleString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Cột 2: Đơn hoàn thành lúc */}
        <div className="flex-1 min-w-[160px] sm:min-w-[200px] flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4">
          <CheckCircle2
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${
              order.status === "shipped" || order.status === "completed"
                ? "text-green-500"
                : "text-slate-300"
            }`}
          />
          <div className="flex flex-col">
            <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-bold tracking-wider">
              Đơn hoàn thành
            </span>
            <span className="text-xs sm:text-sm text-slate-700 font-medium whitespace-nowrap">
              {order.status === "shipped" || order.status === "completed"
                ? new Date(order.updated_at || "").toLocaleString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "Chưa kết thúc"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoCard;
