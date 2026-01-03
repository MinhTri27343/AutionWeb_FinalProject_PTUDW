"use client";

import Image from "next/image";
import { Order, Product } from "../../../../../../../shared/src/types";
import { formatCurrency } from "../../[product_slug]/components/Question";
import Link from "next/link";
import {
  ShoppingBag,
  ChevronRight,
  Tag,
  TrendingUp,
  Clock,
} from "lucide-react";

const BuyingProductCard = ({
  product,
  order,
}: {
  product: Product;
  order: Order;
}) => {
  // Hàm format thời gian gọn gàng: HH:mm - dd/mm/yyyy
  const formatTime = (date: any) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="group relative bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 w-full transition-all hover:shadow-lg hover:border-teal-200 overflow-hidden animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        {/* Phần bên trái: Ảnh + Thông tin sản phẩm */}
        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
          <div className="relative shrink-0">
            <Image
              src={product.main_image}
              alt={product.name}
              width={90}
              height={90}
              className="w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] rounded-xl object-cover border border-slate-100 shadow-sm transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute -top-1.5 -left-1.5 sm:-top-2 sm:-left-2 bg-teal-500 text-white p-1 sm:p-1.5 rounded-lg shadow-lg">
              <ShoppingBag className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </div>
          </div>

          <div className="flex flex-col gap-0.5 sm:gap-1 justify-center min-w-0 flex-1">
            <Link
              href={`/product/sell/${product.slug}?order_navigate=false`}
              className="group/title flex items-center gap-1"
            >
              <h3 className="font-bold text-slate-800 text-sm sm:text-[16px] line-clamp-1 group-hover/title:text-teal-600 transition-colors">
                {product.name}
              </h3>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover/title:translate-x-1 transition-transform shrink-0" />
            </Link>

            <div className="flex flex-col gap-0.5 mt-0.5 sm:mt-1">
              <div className="flex items-center gap-1.5 text-slate-500">
                <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                <span className="text-[11px] sm:text-[13px]">
                  Hiện tại:{" "}
                  <span className="font-semibold text-slate-700">
                    {formatCurrency(product.current_price)}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-500">
                <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                <span className="text-[11px] sm:text-[13px]">
                  Mua ngay:{" "}
                  <span className="font-semibold text-slate-700">
                    {product.buy_now_price
                      ? formatCurrency(product.buy_now_price)
                      : "---"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Phần bên phải: Giá thanh toán + Thời gian (Responsive theo mẫu) */}
        <div className="flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-end gap-1 sm:gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
          {/* Giá thanh toán */}
          <div className="text-left sm:text-right">
            <p className="hidden sm:block text-slate-400 text-[9px] sm:text-[11px] font-bold uppercase tracking-wider mb-0.5 sm:mb-1">
              Giá thanh toán
            </p>
            <p className="text-teal-600 font-black text-xl sm:text-2xl leading-none">
              {formatCurrency(order.price)}
            </p>
          </div>

          {/* Thời gian giao dịch */}
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="text-[10px] sm:text-[12px] font-medium whitespace-nowrap">
              {formatTime(order.created_at)}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-12 h-12 bg-linear-to-br from-transparent to-teal-50/50 rounded-br-2xl -z-10 transition-opacity opacity-0 group-hover:opacity-100" />
    </div>
  );
};

export default BuyingProductCard;
