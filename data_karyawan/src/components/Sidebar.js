import { useContext } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { FaBlog, FaBusinessTime, FaHome, FaSearch } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { AppContext } from "./context";

const Sidebar = () => {
  const data = useContext(AppContext);

  return (
    <>
      {/* Open Sidebar if open-sidebar class is present */}
      <section
        className={data.isSidebarOpen ? "sidebar open-sidebar" : "sidebar"}
      >
        <FiX
          className="close-btn"
          onClick={() => data.setIsSidebarOpen(false)} // intial set false
        />
        <ul>
          <li>
            <a href="/">
              <FaSearch /> Search
            </a>
          </li>
          <li>
            <a href="/">
              <FaHome /> Home
            </a>
          </li>
          <li>
            <a href="/">
              <FaBusinessTime /> Business Insights
            </a>
          </li>
          <li>
            <a href="/">
              <FaBlog /> Blog
            </a>
          </li>
          <li>
            <a href="/">
              <BsInfoCircle /> Preferences
            </a>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Sidebar;
