"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import React from "react";
import { Order } from "../../../../../../shared/src/types";
import { formatCurrency } from "../../[product_slug]/components/Question";
import {
  User,
  Mail,
  MapPin,
  CheckCircle2,
  Clock,
  Phone,
  ShieldCheck,
} from "lucide-react";

type ComponentProps = {
  order: Order;
};

const WaitingConfirmStep = ({ order }: ComponentProps) => {
  return (
    <div className="max-w-[500px] mx-auto py-4 md:py-8 space-y-6 md:space-y-8 md:px-1">
      {/* Header trạng thái */}
      <div className="text-center space-y-2 md:space-y-3 px-4">
        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-50 text-blue-600 mb-1">
          <Clock className="w-6 h-6 md:w-8 md:h-8 animate-pulse" />
        </div>
        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
          Đang chờ xác nhận
        </h2>
        <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-[320px] mx-auto">
          Thông tin của bạn đã được gửi đi, vui lòng chờ người bán kiểm tra.
        </p>
      </div>

      {/* Card Thông tin */}
      <div className="bg-white border border-slate-200 rounded-xl md:rounded-2xl overflow-hidden shadow-sm mx-2 md:mx-0">
        <div className="bg-slate-50 px-4 md:px-6 py-3 md:py-4 border-b border-slate-200 flex items-center justify-between gap-2">
          <h3 className="font-bold text-slate-700 text-[10px] md:text-sm uppercase tracking-wider">
            Thông tin nhận hàng
          </h3>
          <div className="flex items-center gap-1 px-2 md:px-3 py-1 bg-green-50 text-green-600 rounded-full border border-green-200 shrink-0">
            <CheckCircle2 className="w-3 md:w-3.5 h-3 md:h-3.5" />
            <span className="text-[9px] md:text-[10px] font-bold uppercase whitespace-nowrap">
              Đã thanh toán
            </span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {/* Item: Họ tên */}
          <div className="px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4">
            <User className="w-4 h-4 md:w-5 md:h-5 text-slate-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[9px] md:text-[11px] text-slate-400 font-bold uppercase mb-0.5 tracking-tight">
                Người nhận
              </p>
              <p className="text-sm md:text-base font-semibold text-slate-800 truncate">
                {order.buyer.name}
              </p>
            </div>
          </div>

          {/* Item: Số điện thoại */}
          <div className="px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4">
            <Phone className="w-4 h-4 md:w-5 md:h-5 text-slate-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[9px] md:text-[11px] text-slate-400 font-bold uppercase mb-0.5 tracking-tight">
                Số điện thoại
              </p>
              <p className="text-sm md:text-base font-semibold text-slate-800">
                {order.phone_number || "Chưa cung cấp"}
              </p>
            </div>
          </div>

          {/* Item: Email */}
          <div className="px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4">
            <Mail className="w-4 h-4 md:w-5 md:h-5 text-slate-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[9px] md:text-[11px] text-slate-400 font-bold uppercase mb-0.5 tracking-tight">
                Email liên hệ
              </p>
              <p className="text-sm md:text-base font-semibold text-slate-800 truncate">
                {order.buyer.email}
              </p>
            </div>
          </div>

          {/* Item: Địa chỉ */}
          <div className="px-4 md:px-6 py-3 md:py-4 flex items-start gap-3 md:gap-4">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-slate-400 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-[9px] md:text-[11px] text-slate-400 font-bold uppercase mb-0.5 tracking-tight">
                Địa chỉ giao hàng
              </p>
              <p className="text-sm md:text-base font-semibold text-slate-800 leading-snug">
                {order.shipping_address}
              </p>
            </div>
          </div>
        </div>

        {/* Banner tổng tiền cuối Card */}
        <div className="px-4 md:px-5 py-3 md:py-5 bg-blue-600 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-white/90" />
            <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider">
              Tổng cộng
            </span>
          </div>
          <span className="text-lg md:text-xl font-black text-white">
            {formatCurrency(order.price)}
          </span>
        </div>
      </div>

      {/* Loading Area */}
      <div className="flex flex-col items-center gap-4 md:gap-6 pt-2">
        <div className="relative w-full h-16 md:h-20 flex items-center justify-center">
          <div className="scale-75 md:scale-100">
            <LoadingSpinner />
          </div>
        </div>
        <p className="text-slate-400 text-[10px] md:text-sm font-medium animate-pulse text-center px-6">
          Hệ thống sẽ cập nhật ngay khi người bán xác nhận...
        </p>
      </div>
    </div>
  );
};

export default WaitingConfirmStep;
