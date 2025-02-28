import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const ChartCard = ({ title, subheader, chart, height = 300, tooltip }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          tooltip && (
            <Tooltip title={tooltip}>
              <IconButton size="small">
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )
        }
      />
      <CardContent sx={{ flexGrow: 1, p: 1 }}>
        <Box sx={{ height: height, width: "100%" }}>{chart}</Box>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
