import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box/Box";
import darkTheme from "../DarkTheme";

interface DarkDropdownProps {
  range: string;
  setRange: React.Dispatch<React.SetStateAction<string>>;
  rangeList: string[]; // You can replace this with the actual type of rangeList
}

const DarkDropdown: React.FC<DarkDropdownProps> = ({
  range,
  setRange,
  rangeList,
}) => {
  useEffect(() => {
    setRange(rangeList[0]);
  }, []);

  const handleChange = (value: string | any): void => {
    setRange(value);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Select
          value={range}
          onChange={(e) => handleChange(e.target.value)}
          label="Select an option"
          sx={{ mt: 3, color: "white" }}
        >
          {rangeList.map((d, i) => (
            <MenuItem value={d} key={i}>
              {d}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </ThemeProvider>
  );
};

export default DarkDropdown;
