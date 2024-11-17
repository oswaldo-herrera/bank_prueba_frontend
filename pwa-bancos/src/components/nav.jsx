function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="flex justify-between items-center w-full fixed top-0 left-0 bg-black p-4">
      <a href="/" className="text-white text-2xl font-bold">
        Home
      </a>
      <div className="flex space-x-4">
        {!token && (
          <>
            <a
              href="/login"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Login
            </a>
            <a
              href="/register"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Register
            </a>
          </>
        )}
        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
