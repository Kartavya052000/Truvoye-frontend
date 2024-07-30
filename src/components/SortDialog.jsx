import React from 'react';
import { 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  FormControlLabel, 
  Radio, 
  RadioGroup, 
  Typography, 
  Icon
} from '@mui/material';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import filter from '../Assets/imagesV/filter.svg'

const SortDialog = ({ 
  options = [], 
  selectedValue, 
  onChange, 
  icon: IconComponent = TuneRoundedIcon,
  iconSX = {}
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    onChange(event.target.value);
    handleClose();
  };

  return (
    <Box>
      <IconButton
        aria-label="sort"
        aria-controls="sort-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{color:"black"}}
      >
        {/* <IconComponent sx={iconSX} /> */}
        <Icon > <img style={iconSX} src={filter} alt="filter order" /> </Icon>
      </IconButton>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Typography variant="subtitle1" style={{ padding: '10px 16px' }}>
          Sort by:
        </Typography>
        <RadioGroup value={selectedValue} onChange={handleChange}>
          {options.map((option) => (
            <MenuItem sx={{pl:4, pr:4, pt:0, pb:0, m:0}} key={option.value}>
              <FormControlLabel
                value={option.value}
                control={<Radio size="small" />}
                label={option.label}
              />
            </MenuItem>
          ))}
        </RadioGroup>
      </Menu>
    </Box>
  );
};

export default SortDialog;
