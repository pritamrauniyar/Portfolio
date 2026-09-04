import React from "react";
import "./RouteLoader.css";

const RouteLoader = () => {
  return (
    <div className="route-loader-wrap" role="status" aria-label="Loading page content">
      <div className="route-loader-spinner">
        <div className="route-loader-ring" />
        <div className="route-loader-glow" />
      </div>
      <span className="route-loader-text">Loading...</span>
    </div>
  );
};

export default RouteLoader;
