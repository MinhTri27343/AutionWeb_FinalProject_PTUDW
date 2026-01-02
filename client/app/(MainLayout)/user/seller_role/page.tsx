"use client";

import React from "react";
import UpgradeRequestHook from "@/hooks/useUpgrade";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/LoadingSpinner";
import SellerStatusCard from "./SellerStatusCard";
import AlertMessage from "./AlertMessage";

const SellerRolePage: React.FC = () => {
  // --- Custome Hook
  const id = Number(useAuth().user?.id);
  const { data: requestData, isLoading } =
    UpgradeRequestHook.useGetRequestStatus(id);
  const {
    mutate: createRequest,
    isPending: isUpgradePending,
    isSuccess,
    isError,
  } = UpgradeRequestHook.useCreateSellerRequest();

  // --- Filter data ---
  const request = Array.isArray(requestData) ? requestData[0] : requestData;

  // --- Handler ---
  const handleRequestSeller = () => {
    createRequest();
  };

  // --- Exception ---
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full lg:px-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
          <h1 className="text-[13px] [@media(max-width:695px)]:text-[15px]! md:text-2xl font-semibold text-gray-900 mb-4">
            Quyền Seller hoạt động
          </h1>

          <SellerStatusCard
            status={request ? request.status : "none"}
            expiryDate={request?.expired_at ?? new Date()}
            onAction={handleRequestSeller}
            isLoading={isUpgradePending}
          />

          {isSuccess && (
            <AlertMessage
              type="success"
              message="Yêu cầu của bạn đã được gửi thành công! Vui lòng chờ quản trị viên phê duyệt."
            />
          )}

          {isError && (
            <AlertMessage
              type="error"
              message="Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerRolePage;
