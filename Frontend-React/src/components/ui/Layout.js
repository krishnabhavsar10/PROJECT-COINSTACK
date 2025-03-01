import Navbar from "./Navbar"; // Import your navbar component

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar /> {/* Navbar is always visible */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
