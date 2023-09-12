import { useContext, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import LogoGreetDay from "../assets/images/gd.png";
import { AppContext } from "./context";

const Navbar = () => {
  const [isNavDisplay, setIsNavDisplay] = useState(false);
  // use the useContext to access the data
  const data = useContext(AppContext);

  return (
    <header className="header c-scrollbox">
      <nav className="navbar">
        <div className="logo">
          <BiMenuAltLeft
            className="sidebar-open-btn"
            onClick={() => data.setIsSidebarOpen(!data.isSidebarOpen)} // agar bisa ditutup habis click, awalnya false jadi true dst
          />
          <img src={LogoGreetDay} alt="logo" />
        </div>
        <FaBars
          onClick={() => setIsNavDisplay((display) => !display)}
          className="menu-btn"
        />
        <ul className={isNavDisplay ? "active nav-links" : "nav-links"}>
          <li>
            <a href="/" className="nav-link">
              Home
            </a>
            {/* FOR THE SUBMENU */}
            <div className="submenu">
              <ul>
                <li>
                  <a href="/" className="submenu-link">
                    Products
                  </a>
                </li>
                <li>
                  <a href="/" className="submenu-link">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/" className="submenu-link">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="/" className="submenu-link">
                    Collections
                  </a>
                </li>
                <li>
                  <a href="/" className="submenu-link">
                    Messages
                  </a>
                </li>
                <li>
                  <a href="/" className="submenu-link">
                    Notifications
                  </a>
                </li>
              </ul>
            </div>
            {/* FOR THE SUBMENU */}
          </li>
          <li>
            <a href="/features" className="nav-link">
              Business Insights
            </a>
            <div className="submenu">
              <ul
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  marginLeft: "2.5rem",
                }}
              >
                <li>
                  <a href="/" className="submenu-link">
                    Artificial Intelligence
                  </a>
                </li>
                <li>
                  <a href="/" className="submenu-link">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="/" className="submenu-link">
                    Business Intelligence
                  </a>
                </li>
                <li>
                  <a href="/" className="submenu-link">
                    Insights
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="/blogs" className="nav-link">
              Blogs
            </a>
          </li>
          <li>
            <a href="/about" className="nav-link">
              About
            </a>
            <div className="submenu">
              <ul>
                <li>
                  <a href="/" className="submenu-link">
                    Our Services
                  </a>
                </li>
                <li>
                  <a href="/" className="submenu-link">
                    Message Us
                  </a>
                </li>
                <li>
                  <a href="/" className="submenu-link">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
