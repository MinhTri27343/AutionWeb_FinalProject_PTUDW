// components/ui/typography.tsx
import React from "react";

// 1. Tiêu đề (Tự động to lên ở màn hình lớn)
export const SectionTitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <h2 className={`text-xl md:text-2xl font-bold text-gray-800 ${className}`}>
    {children}
  </h2>
);

// 2. Nhãn (Label) cho các trường thông tin
export const LabelText = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-gray-500 font-medium mb-1">{children}</p>
);

// 3. Nội dung giá trị (Value)
export const ValueText = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base md:text-lg text-gray-900 font-medium break-words">
    {children}
  </p>
);

// 4. Container cho một hàng nút bấm (Responsive: Dọc ở mobile, Ngang ở Desktop)
export const ButtonGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8 w-full sm:w-auto sm:max-w-md">
    {children}
  </div>
);