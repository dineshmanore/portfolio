import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"] 
});

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"] 
});

export const metadata: Metadata = {
  title: "Dinesh Manore | Portfolio",
  description: "Cinematic scrollytelling portfolio of Dinesh Manore, aspiring web developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jakarta.variable} ${dmSans.variable} font-dm antialiased bg-bg-base text-text-main`}>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
