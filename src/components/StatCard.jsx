import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Icon,
} from "@mui/material";

const StatCard = ({
  title,
  value,
  icon,
  color,
  subtitle,
  change,
  changePeriod,
}) => {
  const isPositiveChange = change >= 0;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -10,
          right: -10,
          width: 100,
          height: 100,
          borderRadius: "50%",
          backgroundColor: `${color}.light`,
          opacity: 0.2,
        }}
      />
      <CardContent sx={{ flexGrow: 1, position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="subtitle1" color="text.secondary">
            {title}
          </Typography>
          <Box
            sx={{
              bgcolor: `${color}.light`,
              color: `${color}.main`,
              borderRadius: "50%",
              width: 40,
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {icon}
          </Box>
        </Box>
        <Typography variant="h4" component="div" gutterBottom>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {subtitle}
          </Typography>
        )}
        <Divider sx={{ my: 1 }} />
        {change !== undefined && changePeriod && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              sx={{
                color: isPositiveChange ? "success.main" : "error.main",
                fontWeight: 500,
                mr: 0.5,
              }}
            >
              {isPositiveChange && "+"}
              {change}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              vs {changePeriod}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
