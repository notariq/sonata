import Link from "next/link";

const Playlists = () => {
return (
    <div className="container">
      <h1>Playlists will be shown here</h1>
      <div className="cursor">
        <Link href="/playlists/1">
          <h2>Playlist 1</h2>
        </Link>
      </div>
    </div>
  )
};

export default Playlists;