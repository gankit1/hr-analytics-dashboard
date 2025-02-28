import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          py: 8,
          px: 4,
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          color="primary"
          sx={{ mb: 4, fontWeight: "bold" }}
        >
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{ maxWidth: 500 }}
        >
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/"
          startIcon={<HomeIcon />}
          sx={{ mt: 3 }}
        >
          Back to Dashboard
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFound;
