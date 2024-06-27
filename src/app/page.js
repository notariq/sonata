import Player from "@/components/player/page"

export default function Home() {
  return (
    <div className="">
      <div>
        <h1>Home</h1>
      </div>
      <div className="fixed bottom-0 w-full">
        <Player />
      </div>
    </div>
  )
}
