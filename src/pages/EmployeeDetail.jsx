import React from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AssignmentInd as AssignmentIcon,
  CalendarToday as CalendarIcon,
  Star as StarIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import { useEmployees } from "../context/EmployeeContext";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isEditing = searchParams.get("edit") === "true";
  const navigate = useNavigate();
  const { getEmployeeById, getDepartmentById, deleteEmployee } = useEmployees();

  const employee = getEmployeeById(id);

  if (!employee) {
    return (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h5" gutterBottom>
          Employee not found
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/employees")}
          sx={{ mt: 2 }}
        >
          Back to Employees
        </Button>
      </Box>
    );
  }

  const department = getDepartmentById(employee.departmentId);

  const handleDelete = () => {
    deleteEmployee(id);
    navigate("/employees");
  };

  // Format performance stars
  const renderPerformanceStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        sx={{
          color: i < rating ? "warning.main" : "text.disabled",
          fontSize: "1.2rem",
        }}
      />
    ));
  };

  // Status color map
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "On Leave":
        return "warning";
      case "Remote":
        return "info";
      case "Contract":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton sx={{ mr: 1 }} onClick={() => navigate("/employees")}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Employee Details</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/employees/${id}?edit=true`)}
          sx={{ mr: 1 }}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Employee Profile Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center", pt: 5 }}>
              <Avatar
                src={employee.avatar}
                alt={`${employee.firstName} ${employee.lastName}`}
                sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
              />
              <Typography variant="h5" gutterBottom>
                {employee.firstName} {employee.lastName}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                {employee.designation}
              </Typography>
              <Chip
                label={employee.status}
                color={getStatusColor(employee.status)}
                sx={{ mt: 1 }}
              />

              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                {renderPerformanceStars(employee.performance)}
              </Box>

              <Divider sx={{ my: 3 }} />

              <List sx={{ width: "100%" }}>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Email" secondary={employee.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phone"
                    secondary={employee.phoneNumber}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Location"
                    secondary={employee.location}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CalendarIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Hire Date"
                    secondary={format(
                      new Date(employee.hireDate),
                      "MMMM dd, yyyy"
                    )}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Employee Details */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Employment Information */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Employment Information
                  </Typography>
                  <Divider sx={{ mb: 3 }} />

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Department
                        </Typography>
                        <Typography variant="body1">
                          {department ? department.name : "Not Assigned"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Manager
                        </Typography>
                        <Typography variant="body1">
                          {department ? department.manager : "Not Assigned"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Designation
                        </Typography>
                        <Typography variant="body1">
                          {employee.designation}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Status
                        </Typography>
                        <Typography variant="body1">
                          {employee.status}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Employment Type
                        </Typography>
                        <Typography variant="body1">
                          {employee.status === "Contract"
                            ? "Contract"
                            : "Full-time"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Work Location
                        </Typography>
                        <Typography variant="body1">
                          {employee.location}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Compensation Information */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Compensation
                  </Typography>
                  <Divider sx={{ mb: 3 }} />

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Base Salary
                        </Typography>
                        <Typography variant="h6" color="primary.main">
                          ₹{employee.salary.toLocaleString()} per annum
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Monthly Salary
                        </Typography>
                        <Typography variant="body1">
                          ₹{Math.round(employee.salary / 12).toLocaleString()}{" "}
                          per month
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Performance Rating
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {renderPerformanceStars(employee.performance)}
                          <Typography variant="body1" sx={{ ml: 1 }}>
                            ({employee.performance}/5)
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Last Review
                        </Typography>
                        <Typography variant="body1">
                          {format(
                            new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
                            "MMMM dd, yyyy"
                          )}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Additional Information */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Last Updated
                  </Typography>
                  <Divider sx={{ mb: 3 }} />

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Last Updated On
                    </Typography>
                    <Typography variant="body1">
                      {format(new Date(), "MMMM dd, yyyy HH:mm:ss")}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Last Updated By
                    </Typography>
                    <Typography variant="body1">
                      AnkitKumarGupta (Admin)
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EmployeeDetail;
