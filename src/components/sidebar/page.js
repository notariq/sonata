import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-black text-white flex flex-col">
      <div className="p-4 text-2xl font-bold text-center">
        <Link href="/">SONATA</Link>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-2">
            <Link href="/">
              <p className="block p-2 hover:bg-gray-700 rounded">Home</p>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/search">
              <p className="block p-2 hover:bg-gray-700 rounded">Search</p>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/favorites">
              <p className="block p-2 hover:bg-gray-700 rounded">Favorites</p>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/playlists">
              <p className="block p-2 hover:bg-gray-700 rounded">Playlists</p>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/user">
              <p className="block p-2 hover:bg-gray-700 rounded">User</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
