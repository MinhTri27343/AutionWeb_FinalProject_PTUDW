// app/layout.tsx
"use client";
import { Footer } from "@/components/Footer/Footer";
import "../globals.css";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProtectedRoute>
        <Header />
        <div className="mt-[100px] flex container-layout gap-8 mb-[50px]">
          {children}
        </div>
        <Footer />
      </ProtectedRoute>
    </>
  );
}

/*
- Dien thoai --> sp3 , sp4  
+ Iphone: Sp1 , sp2 
*/
