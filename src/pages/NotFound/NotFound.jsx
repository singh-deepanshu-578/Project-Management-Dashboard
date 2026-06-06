import { useNavigate } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <div className="notfound__content">
        <h1 className="notfound__code">404</h1>
        <h2 className="notfound__title">Page Not Found</h2>
        <p className="notfound__desc">
          Oops! The page you're looking for doesn't exist.
        </p>
        <button
          className="notfound__btn"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
