// app/layout.tsx
import "./globals.css";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "AuctionHub",
  description: "Website đấu giá uy tín thịnh hành số 1 quốc tế",
  icons: {
    icon: [
      { url: "/short-logo.png" }, // Đường dẫn tới file logo trong thư mục public/
      { url: "/short-logo.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-slate-50 antialiased">
        <Providers>{children}</Providers>
        <ToastContainer />
      </body>
    </html>
  );
}

/*
- Dien thoai --> sp3 , sp4  
+ Iphone: Sp1 , sp2 
*/
