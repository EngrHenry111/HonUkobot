import Sidebar from "../Sidebar/Sidebar";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;