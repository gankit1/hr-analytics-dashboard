import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  IconButton,
  Divider,
  Alert,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useEmployees } from "../context/EmployeeContext";

const AddEmployee = () => {
  const navigate = useNavigate();
  const { departments, addEmployee } = useEmployees();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    departmentId: "",
    designation: "",
    salary: "",
    status: "Active",
    location: "",
    phoneNumber: "",
    performance: 3,
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formValues.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!formValues.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!formValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email is invalid";
    }

    if (!formValues.departmentId) {
      errors.departmentId = "Department is required";
    }

    if (!formValues.designation.trim()) {
      errors.designation = "Designation is required";
    }

    if (!formValues.salary) {
      errors.salary = "Salary is required";
    } else if (isNaN(formValues.salary) || Number(formValues.salary) <= 0) {
      errors.salary = "Salary must be a positive number";
    }

    if (!formValues.location.trim()) {
      errors.location = "Location is required";
    }

    if (!formValues.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    }

    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Prepare employee data with proper types
      const employeeData = {
        ...formValues,
        salary: Number(formValues.salary),
        performance: Number(formValues.performance),
        // Use a default avatar based on gender
        avatar:
          formValues.gender === "male"
            ? `https://mui.com/static/images/avatar/${
                Math.floor(Math.random() * 4) + 1
              }.jpg`
            : `https://mui.com/static/images/avatar/${
                Math.floor(Math.random() * 4) + 5
              }.jpg`,
      };

      const newEmployee = addEmployee(employeeData);

      setSuccessMessage("Employee added successfully!");

      // Reset form after success
      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        departmentId: "",
        designation: "",
        salary: "",
        status: "Active",
        location: "",
        phoneNumber: "",
        performance: 3,
      });

      // Navigate to the employee details page after a delay
      setTimeout(() => {
        navigate(`/employees/${newEmployee.id}`);
      }, 1500);
    } catch (err) {
      setError("An error occurred while adding the employee.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton sx={{ mr: 1 }} onClick={() => navigate("/employees")}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Add New Employee</Typography>
      </Box>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleChange}
                  error={Boolean(formErrors.firstName)}
                  helperText={formErrors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleChange}
                  error={Boolean(formErrors.lastName)}
                  helperText={formErrors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  required
                  error={Boolean(formErrors.gender)}
                >
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formValues.gender}
                    label="Gender"
                    onChange={handleChange}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                  <FormHelperText>{formErrors.gender}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  error={Boolean(formErrors.email)}
                  helperText={formErrors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  value={formValues.phoneNumber}
                  onChange={handleChange}
                  error={Boolean(formErrors.phoneNumber)}
                  helperText={formErrors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  value={formValues.location}
                  onChange={handleChange}
                  error={Boolean(formErrors.location)}
                  helperText={formErrors.location}
                />
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Employment Information
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  required
                  error={Boolean(formErrors.departmentId)}
                >
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="departmentId"
                    value={formValues.departmentId}
                    label="Department"
                    onChange={handleChange}
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{formErrors.departmentId}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="designation"
                  label="Designation"
                  name="designation"
                  value={formValues.designation}
                  onChange={handleChange}
                  error={Boolean(formErrors.designation)}
                  helperText={formErrors.designation}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="salary"
                  label="Annual Salary (₹)"
                  name="salary"
                  type="number"
                  value={formValues.salary}
                  onChange={handleChange}
                  error={Boolean(formErrors.salary)}
                  helperText={formErrors.salary}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formValues.status}
                    label="Status"
                    onChange={handleChange}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="On Leave">On Leave</MenuItem>
                    <MenuItem value="Remote">Remote</MenuItem>
                    <MenuItem value="Contract">Contract</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Performance Rating</InputLabel>
                  <Select
                    name="performance"
                    value={formValues.performance}
                    label="Performance Rating"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>1 - Poor</MenuItem>
                    <MenuItem value={2}>2 - Below Average</MenuItem>
                    <MenuItem value={3}>3 - Average</MenuItem>
                    <MenuItem value={4}>4 - Good</MenuItem>
                    <MenuItem value={5}>5 - Excellent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                type="button"
                onClick={() => navigate("/employees")}
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Employee"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default AddEmployee;
