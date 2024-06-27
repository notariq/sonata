import "./globals.css";
import Sidebar from "@/components/sidebar/page";

export const metadata = {
  title: "SONATA",
  description: "Music Website by notariq",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
