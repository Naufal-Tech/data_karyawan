import React from "react";
import "../assets/css/NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="h-100 w-100 bg-white">
        <div className="empty-2-2 container mx-auto d-flex align-items-center justify-content-center flex-column">
          <img
            className="main-img img-fluid"
            src="http://api.elements.buildwithangga.com/storage/files/2/assets/Empty%20State/EmptyState2/Empty-2-2.png"
            alt=""
          />

          <div className="text-center w-100">
            <h1 className="display-3">Opss! Page Not Found!</h1>
            <p className="title-caption fs-4">
              The page you are looking for is not found. We
              <br className="d-sm-block d-none" />
              suggest you Back to Homepage.
            </p>
            <div className="d-inline-flex">
              <button onClick={backToHome} className="btn btn-lg btn-light">
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
