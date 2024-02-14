import style from "./Homepage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";

const Homepage = () => {
  return (
    <div className={style.container}>
      <Navbar />
      <div className={style.taglineText}>
        <p>We compare hotel prices from 100s of sites</p>
        <p>We'll do the searching. You do the saving.</p>
      </div>
      <SearchBar />
    </div>
  );
};

export default Homepage;
