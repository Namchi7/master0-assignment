import * as React from "react";
import PropTypes from "prop-types";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const toggleGroupStyle = {
  backgroundColor: "white",
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
};

function SelectBetButtonGroup(props) {
  const items = props.items;
  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    props.setItem(newAlignment);
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="secondary"
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="Select bet value"
      sx={toggleGroupStyle}
    >
      <ToggleButton
        // onClick={() => props.setItem(items[0])}
        value={items[0]}
        aria-label={items[0]}
      >
        {items[0]}
      </ToggleButton>
      <ToggleButton
        // onClick={() => props.setItem(items[1])}
        value={items[1]}
        aria-label={items[1]}
      >
        {items[1]}
      </ToggleButton>
      <ToggleButton
        // onClick={() => props.setItem(items[2])}
        value={items[2]}
        aria-label={items[2]}
      >
        {items[2]}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

SelectBetButtonGroup.propTypes = {
  items: PropTypes.array,
  setItem: PropTypes.any,
};

export default SelectBetButtonGroup;
