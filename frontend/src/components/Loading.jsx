import React from "react";
import { Spinner } from "react-bootstrap";

function Loading({ size = 100 }) {
  return (
    <div
      style={{
        position: "fixed", // Fix the loader to the screen
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex", // Use flexbox to center the loader
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional dark overlay
        zIndex: 9999, // Make sure it’s on top of other content
      }}
    >
      <Spinner
        style={{
          width: size,
          height: size,
        }}
        animation="border"
        variant="light" // Optional: Change color if needed
      />
    </div>
  );
}


export default Loading;
