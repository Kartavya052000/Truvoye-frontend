// ButtonGroupComponent.js
import React from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import '../styles/Login.css'

const ButtonGroupComponent = ({ buttons, activeButton }) => {
  return (
    <ButtonGroup size="large" aria-label="Large button group" className ="Buttongrp" sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50px", zIndex:"1", }}>
      {buttons.map(({ name, link }) => (
        <Button
          key={name}
          className={`nav-button ${activeButton === name ? 'mui-selected' : 'unselected'}`}
          sx={{ borderRadius: "50px", padding: "8px 60px", textTransform: "none", color:"black" }}
          component={NavLink}
          to={link}
        >
          {name}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default ButtonGroupComponent;
