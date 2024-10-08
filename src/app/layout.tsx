import type { Metadata } from "next";
import "./globals.css";
import { plusJakartaSans } from "@/assets/font";
import { LayoutFC } from "@/utils/types";

export const metadata: Metadata = {
  title: {
    default: "eusate",
    template: "%s | eusate",
  },
  description: "Supercharge your customer support with our AI powered agents",
};

const RootLayout: LayoutFC = ({ children }) => {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
