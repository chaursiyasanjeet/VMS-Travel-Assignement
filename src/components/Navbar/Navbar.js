import style from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import globeIcon from "../../assets/globe.png";
import hamburger from "../../assets/hamburger.png";
import userIcon from "../../assets/user.png";
import favouriteIcon from "../../assets/heart.png";

const Navbar = () => {
  return (
    <nav className={style.navbar_container}>
      <img src={logo} alt="comapny_logo" className={style.logo} />
      <div className={style.all_nav_menu}>
        <div>
          <img src={favouriteIcon} alt="favourite_icon" />
          <span>Favourites</span>
        </div>
        <div>
          <img src={globeIcon} alt="globe_icon" />
          <span>EN . ₹</span>
        </div>
        <div>
          <img src={userIcon} alt="user_icon" />
          <span>Log in</span>
        </div>
        <div>
          <img src={hamburger} alt="hamburger_icon" />
          <span>Menu</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
