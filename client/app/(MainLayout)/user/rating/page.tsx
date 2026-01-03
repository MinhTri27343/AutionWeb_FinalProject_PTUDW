"use client";
import React, { useCallback } from "react";
import RatingLog from "./RatingLog";
import { RatingHook } from "@/hooks/useRating";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useMemo, useState } from "react";
import Pagination from "@/components/Pagination";
import { SectionTitle } from "@/components/ui/typography"; 

const StatBox = ({
  label,
  value,
  colorClass,
  bgClass,
}: {
  label: string;
  value: string | number;
  colorClass: string;
  bgClass: string;
}) => (
  <div className="bg-slate-200 py-8 lg:mx-2 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-1">
    <div className="text-center">
      <p className={`text-2xl md:text-4xl font-bold ${colorClass}`}>{value}</p>
      <p className="text-sm text-gray-500 font-medium mt-1 uppercase tracking-wide">
        {label}
      </p>
    </div>
  </div>
);

const RatingPage = () => {
  // --- Define State ---
  const limit: number = 4;
  const [offset, setOffset] = useState<number>(0);
  const [currentPage, setPage] = useState<number>(1);

  // --- Custom Hook ---
  const userId = useAuth();
  const {
    data: userRating,
    isLoading: isTotalRatingLoading,
    error: errorTotalRating,
  } = RatingHook.useGetTotalRating(Number(userId.user?.id));
  const {
    data: ratingByPage,
    isLoading,
    error,
  } = RatingHook.useGetRating(Number(userId.user?.id), offset);

  // --- React Hook ---
  const handlePageChange = useCallback((page: number) => {
    setPage(page);
    setOffset((page - 1) * limit);
  }, []);

  // --- Memo ---
  const positiveRatingPercent = useMemo(() => {
    if (!userRating || !userRating.logs) return 0;

    const positiveCount = userRating.logs.filter(
      (log: any) => log.rating > 0
    ).length;
    const total = userRating.logs.length;

    return total === 0 ? 0 : Math.round((positiveCount / total) * 100);
  }, [userRating]);

  const sumPositiveRating = useMemo(() => {
    if (!userRating || !userRating.logs.length) return 0;

    return userRating.logs.filter((log: any) => log.rating > 0).length;
  }, [userRating]);

  const sumRating = useMemo(() => {
    return userRating?.logs.length || 0;
  }, [userRating]);

  // --- Exception ---
  if (isLoading || isTotalRatingLoading)
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  if (error || errorTotalRating)
    return (
      <div className="text-center text-red-500 mt-10">
        Lỗi tải dữ liệu đánh giá.
      </div>
    );

  if (!userRating || !ratingByPage)
    return (
      <div className="text-center text-gray-500 mt-10">
        Chưa có dữ liệu đánh giá.
      </div>
    );

  return (
    <div className="w-full background-user flex flex-col gap-2 mx-auto p-4 md:p-6 pb-20">
      <div className="mb-4">
        <SectionTitle>Chi tiết đánh giá</SectionTitle>
        <p className="text-gray-500 text-sm mt-1">
          Tổng quan về phản hồi từ cộng đồng
        </p>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <StatBox
          label="Tỷ lệ tích cực"
          value={`${positiveRatingPercent}%`}
          colorClass="text-green-600"
          bgClass="bg-green-50"
        />
        <StatBox
          label="Lượt khen"
          value={sumPositiveRating}
          colorClass="text-blue-600"
          bgClass="bg-blue-50"
        />
        <StatBox
          label="Tổng lượt đánh giá"
          value={sumRating}
          colorClass="text-purple-600"
          bgClass="bg-purple-50"
        />
      </section>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="mb-6">
            <SectionTitle>Lịch sử đánh giá</SectionTitle>
            <p className="text-gray-500 text-sm mt-1">
              Những phản hồi gần đây
            </p>
          </div>
          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-600">
            Trang {currentPage}
          </span>
        </div>

        {ratingByPage.logs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {ratingByPage.logs.map((log: any) => (
              <div
                key={log.id}
                className="animate-in fade-in slide-in-from-bottom-2 duration-500"
              >
                <RatingLog ratingLog={log} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-10 italic">
            Không có đánh giá nào ở trang này.
          </p>
        )}
      </div>

      <div className="w-full flex justify-center mt-5">
        <Pagination
          totalPages={Math.ceil(sumRating / limit)}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default RatingPage;
