import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { accessToken, user, loading, refresh, fetchMe } = useAuthStore();
  const [starting, setStarting] = useState(true);

  useEffect(() => {
    const init = async () => {
      // Xay ra khi refresh trang

      if (!accessToken) {
        await refresh();
      }

      if (accessToken && !user) {
        await fetchMe();
      }

      setStarting(false);
    };
    init();
  }, []);

  useEffect(() => {
  if (!starting && !accessToken) {
    router.replace("/login");
  }
}, [starting, accessToken, router]);


  // Nếu chưa mount (đang load lại trang) hoặc không có token -> Hiện loading hoặc null
  if (starting || loading) {
    return <LoadingSpinner />; // Hoặc <LoadingScreen /> rất quan trọng để tránh nháy
  }
  return <>{children}</>;
};

export default ProtectedRoute;
