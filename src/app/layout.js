import "./globals.css";

import Sidebar from "@/components/sidebar/page";
import Player from "@/components/player/page"
import Footer from "@/components/footer";
import { Open_Sans } from "next/font/google";

import { AudioProvider } from "../contexts/audioContext";
import { AuthProvider } from '../contexts/authContext';

const sans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "SONATA",
  description: "Music Website by notariq",
  icons: {
    icon:'/vinyl2.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <AudioProvider><AuthProvider>
      <html lang="en">
        <body className={`${sans.className} bg-gradient-to-br from-gray-800 to-gray-600 text-white`}>
          <div className="flex">
            <Sidebar />
            <div className="px-16 pt-10 pb-[10%] h-full w-full relative">
              {children}
              <Footer />
            </div>
          </div>
          <div className="fixed bottom-0 w-full">
            <Player />
          </div>
        </body>
      </html>
      </AuthProvider></AudioProvider>
  );
}