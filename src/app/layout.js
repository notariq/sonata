import "./globals.css";
import Sidebar from "@/components/sidebar/page";
import Player from "@/components/player/page"


export const metadata = {
  title: "SONATA",
  description: "Music Website by notariq",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          <div className="px-16 py-10">
            {children}
          </div>
        </div>
        <div className="fixed bottom-0 w-full">
          <Player />
        </div>
      </body>
    </html>
  );
}
