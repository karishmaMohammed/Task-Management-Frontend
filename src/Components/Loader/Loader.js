import React from "react";
import "./Loader.css";

function Loader() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background:'inherit',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span class="loader"></span>
    </div>
  );
}

export default Loader;
