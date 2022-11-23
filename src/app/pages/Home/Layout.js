import "./index.css";
import Banner from "../../components/Banner/Banner";
import submittedImage from "../../../static/img/submittedImage.png";

const Layout = ({ ...props }) => {
  return (
    <div className="auth">
      <Banner />
      <div className="auth-layout">
        <div className="auth-left">
          <img src={submittedImage} class="auth-img" alt="Idea pen" />
        </div>
        <div className={`auth-right ${props.className}`}>{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
