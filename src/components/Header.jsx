import { FaUserCircle } from "react-icons/fa";

function Header() {
  return (
    <header className="header">

      <h2>🎓 Tin học 3 Online</h2>

      <div className="user-info">

        <FaUserCircle size={35} />

        <span>Kim Dung</span>

      </div>

    </header>
  );
}

export default Header;