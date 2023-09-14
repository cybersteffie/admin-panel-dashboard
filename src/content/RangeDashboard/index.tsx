import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import DarkDropdown from "../../components/DropDown";
import googleSheetApi from "../../api/fetchGoogleSheet";
import DoughnutChart from "../../components/DonutChart";
import StackedBarChart from "../../components/StackedBar";
import {
  rangeLists,
  rangesCompletedvsPartialDonut,
  stackedBar,
} from "../../dataProcessingFuncs";

function RangeDashboard() {
  const [range, setRange] = useState<string>("");
  const link =
    "https://docs.google.com/spreadsheets/d/1FkpfT5Ts8ZZxcpznb3SH1-1jb7c-KX0j-ol-40aLwGo/gviz/tq?";
  const { isLoading, data } = useQuery(
    ["getGoogleData"],
    () => {
      return googleSheetApi.fetchData(link);
    },
    {
      staleTime: 300000,
      keepPreviousData: true,
    }
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        background: "#010522",
        minHeight: "100vh",
      }}
    >
      {" "}
      {!isLoading ? (
        <>
          <DarkDropdown
            range={range}
            setRange={setRange}
            rangeList={rangeLists(data)}
          />
          <Grid container>
            <Grid item md={6} xs={12} key={1}>
              <Card sx={{ m: 3, background: "rgba(29, 32, 58, 0.99)" }}>
                <Typography
                  variant="h5"
                  textAlign="center"
                  color="white"
                  mt={1.5}
                >
                  Completion Rate
                </Typography>

                <CardContent key={"1c"}>
                  <DoughnutChart
                    data={rangesCompletedvsPartialDonut(data, range)}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={6} xs={12} key={2}>
              <Card sx={{ m: 3, background: "rgba(29, 32, 58, 0.99)" }}>
                <Typography
                  variant="h5"
                  textAlign="center"
                  color="white"
                  mt={1.5}
                >
                  Attempts/Hints by Goal
                </Typography>

                <CardContent key={"2c"}>
                  <StackedBarChart data={stackedBar(data, range)} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      ) : (
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            size={60}
            thickness={5.1}
            sx={{ color: blue[500] }}
          />
        </Box>
      )}
    </Box>
  );
}

export default RangeDashboard;
