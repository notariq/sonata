import "./globals.css";
import Sidebar from "@/components/sidebar/page";
import Player from "@/components/player/page"
import { AudioProvider } from "./audioContext";


export const metadata = {
  title: "SONATA",
  description: "Music Website by notariq",
};

export default function RootLayout({ children }) {
  return (
    <AudioProvider>
      <html lang="en">
        <body className="bg-gradient-to-br from-gray-800 to-gray-600 text-white">
          <div className="flex">
            <Sidebar />
            <div className="px-16 pt-10 pb-[10%] h-full w-full relative">
              {children}
              <footer className="mt-10 text-gray-400 font-medium border-t border-gray-600 py-5 px-2 h-auto">
                <p>Hauzan Ariq Bakri</p>
                <p>2024</p>
              </footer>
            </div>
          </div>
          <div className="fixed bottom-0 w-full">
            <Player />
          </div>
        </body>
      </html>
    </AudioProvider>
  );
}
