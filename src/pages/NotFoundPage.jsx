import React from "react";

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <a
        href="https://www.youtube.com/watch?v=_SBQvd6vY9s"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/Gandalf.png"
          alt="Not Found"
          style={{
            maxWidth: "70%",
            height: "auto",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        />
        <p>Redirect, you fools.</p>
      </a>
    </div>
  );
};

export default NotFoundPage;
