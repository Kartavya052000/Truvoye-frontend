import { Box, Button, IconButton, Menu } from "@mui/material";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";

const ChoiceDialog = ({
  options = [],
  onChange,
  icon: IconComponent = SettingsIcon,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChoiceClick = (choice) => {
    onChange(choice);
    handleClose();
  };

  return (
    <Box>
      <IconButton
        aria-label="choice"
        aria-controls="choice-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: "black" }}
      >
        <IconComponent style={{ color: '#1237BF' }}/>
      </IconButton>

      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <Box key={index}>
            <Button
              sx={{ minWidth: "150px", color: "#1237BF" }}
              onClick={() => {
                onChoiceClick(option);
              }}
              variant="text"
            >
              {option}
            </Button>
            {index < options.length - 1 && (
              <Divider sx={{ bgcolor: "#F9A33F" }} />
            )}
          </Box>
        ))}
        {/* <Button sx={{ minWidth:"150px", color:"#1237BF"}} onClick={ () => {onChoiceClick("edit")}} variant="text">Edit</Button>
        <Divider sx={{bgcolor:"#F9A33F"}} />
        <Button sx={{minWidth:"150px", color:"#1237BF"}} onClick={ () => {onChoiceClick("deactivate")}} variant="text">Deactivate</Button> */}
      </Menu>
    </Box>
  );
};

export default ChoiceDialog;
