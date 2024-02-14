import style from "./Homepage.module.css";
import Navbar from "../../components/Navbar/Navbar";

const Homepage = () => {
  return (
    <div className={style.container}>
      <Navbar />
    </div>
  );
};

export default Homepage;
