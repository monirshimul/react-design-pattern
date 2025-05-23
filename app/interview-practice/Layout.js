

const Layout = ({ children, bgColor = "bg-white" }) => {
  return (
    <div className={`${bgColor} min-h-screen`}>
      <header className="p-4 bg-gray-800 text-white text-xl">My Site</header>
      <main className="p-5">{children}</main>
      <footer className="p-4 text-center text-sm text-gray-600">© 2025</footer>
    </div>
  );
};

export default Layout;
