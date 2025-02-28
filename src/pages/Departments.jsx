import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  LocationOn as LocationIcon,
  SupervisorAccount as SupervisorIcon,
} from "@mui/icons-material";
import { useEmployees } from "../context/EmployeeContext";
import { v4 as uuidv4 } from "uuid";

const COLORS = [
  "#1976d2",
  "#2e7d32",
  "#9c27b0",
  "#ed6c02",
  "#d32f2f",
  "#0288d1",
];

const Departments = () => {
  const {
    departments,
    employees,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  } = useEmployees();
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [formValues, setFormValues] = useState({
    name: "",
    manager: "",
    budget: "",
    location: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleOpenDialog = (department = null) => {
    if (department) {
      setFormValues({
        name: department.name,
        manager: department.manager,
        budget: department.budget,
        location: department.location,
      });
      setEditMode(true);
      setCurrentDepartment(department);
    } else {
      setFormValues({
        name: "",
        manager: "",
        budget: "",
        location: "",
      });
      setEditMode(false);
      setCurrentDepartment(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormErrors({});
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

  const validateForm = () => {
    const errors = {};

    if (!formValues.name.trim()) {
      errors.name = "Department name is required";
    }

    if (!formValues.manager.trim()) {
      errors.manager = "Manager name is required";
    }

    if (!formValues.budget) {
      errors.budget = "Budget is required";
    } else if (isNaN(formValues.budget) || Number(formValues.budget) <= 0) {
      errors.budget = "Budget must be a positive number";
    }

    if (!formValues.location.trim()) {
      errors.location = "Location is required";
    }

    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editMode && currentDepartment) {
      // Update existing department
      updateDepartment(currentDepartment.id, {
        ...formValues,
        budget: Number(formValues.budget),
      });
    } else {
      // Add new department
      addDepartment({
        ...formValues,
        budget: Number(formValues.budget),
        employeeCount: 0, // Initially no employees
      });
    }

    handleCloseDialog();
  };

  const handleOpenDeleteDialog = (id) => {
    setDeleteId(id);
    setDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog(false);
    setDeleteId(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteDepartment(deleteId);
    }
    handleCloseDeleteDialog();
  };

  const getDepartmentEmployeeCount = (departmentId) => {
    return employees.filter(
      (employee) => employee.departmentId === departmentId
    ).length;
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Departments</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Department
        </Button>
      </Box>

      <Grid container spacing={3}>
        {departments.map((department, index) => (
          <Grid item xs={12} sm={6} md={4} key={department.id}>
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
                  bgcolor: COLORS[index % COLORS.length],
                  height: 16,
                }}
              />
              <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Tooltip title="Edit Department">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(department)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Department">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDeleteDialog(department.id)}
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Typography variant="h5" component="div" gutterBottom>
                  {department.name}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <SupervisorIcon
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                  <Typography variant="body2">{department.manager}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LocationIcon
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                  <Typography variant="body2">{department.location}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <PeopleIcon
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                  <Typography variant="body2">
                    {getDepartmentEmployeeCount(department.id)} employees
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <MoneyIcon
                    fontSize="small"
                    sx={{ mr: 1, color: "text.secondary" }}
                  />
                  <Typography variant="body2">
                    ₹{department.budget.toLocaleString()} budget
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Department Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editMode ? "Edit Department" : "Add Department"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                required
                fullWidth
                label="Department Name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                error={Boolean(formErrors.name)}
                helperText={formErrors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Manager"
                name="manager"
                value={formValues.manager}
                onChange={handleChange}
                error={Boolean(formErrors.manager)}
                helperText={formErrors.manager}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Budget (₹)"
                name="budget"
                type="number"
                value={formValues.budget}
                onChange={handleChange}
                error={Boolean(formErrors.budget)}
                helperText={formErrors.budget}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Location"
                name="location"
                value={formValues.location}
                onChange={handleChange}
                error={Boolean(formErrors.location)}
                helperText={formErrors.location}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Department</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this department? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Departments;
