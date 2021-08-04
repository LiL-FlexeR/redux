import { Typography, Card } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const Description = () => {
  return (
    <div>
      <Card
        style={{
          height: "30vh",
          margin: "0 auto",
          marginTop: "10vh",
          width: "80%",
          padding: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h3">Sorry! Page not found</Typography>
        <Link
          style={{
            textDecoration: "none",
            color: "#000",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
          to="/"
        >
          Back to main page
        </Link>
      </Card>
    </div>
  );
};

export default Description;
