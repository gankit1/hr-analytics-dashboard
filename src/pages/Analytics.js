import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { useEmployees } from "../context/EmployeeContext";
import {
  salaryDistributionData,
  genderDistribution,
  departmentDistribution,
  hiringData,
  departmentPerformanceData,
} from "../data/mockData";
import ChartCard from "../components/ChartCard";

const Analytics = () => {
  const { employees, departments } = useEmployees();
  const [timeFrame, setTimeFrame] = useState("yearly");

  // Colors for charts
  const COLORS = [
    "#1976d2",
    "#2e7d32",
    "#9c27b0",
    "#ed6c02",
    "#d32f2f",
    "#0288d1",
  ];

  // Calculate average salary by department
  const salaryByDepartment = departments.map((dept) => {
    const deptEmployees = employees.filter(
      (emp) => emp.departmentId === dept.id
    );
    const avgSalary =
      deptEmployees.length > 0
        ? deptEmployees.reduce((sum, emp) => sum + emp.salary, 0) /
          deptEmployees.length
        : 0;

    return {
      name: dept.name,
      value: Math.round(avgSalary),
    };
  });

  // Calculate performance distribution
  const performanceDistribution = [
    {
      name: "Poor (1)",
      value: employees.filter((emp) => emp.performance === 1).length,
    },
    {
      name: "Below Average (2)",
      value: employees.filter((emp) => emp.performance === 2).length,
    },
    {
      name: "Average (3)",
      value: employees.filter((emp) => emp.performance === 3).length,
    },
    {
      name: "Good (4)",
      value: employees.filter((emp) => emp.performance === 4).length,
    },
    {
      name: "Excellent (5)",
      value: employees.filter((emp) => emp.performance === 5).length,
    },
  ];

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Analytics & Reports
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Visualized data to help you make informed decisions
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Department Performance */}
        <Grid item xs={12}>
          <ChartCard
            title="Department Performance Overview"
            subheader="Performance metrics by department"
            height={350}
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={departmentPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="performance"
                    name="Performance Rating"
                    fill="#8884d8"
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="employeeSatisfaction"
                    name="Employee Satisfaction"
                    fill="#82ca9d"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="expenses"
                    name="Expenses (₹)"
                    fill="#ffc658"
                  />
                </BarChart>
              </ResponsiveContainer>
            }
          />
        </Grid>

        {/* Hiring Trends */}
        <Grid item xs={12} md={8}>
          <ChartCard
            title="Hiring Trends"
            subheader="Past 12 months"
            height={350}
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={hiringData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="hired"
                    name="New Hires"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                  <Area
                    type="monotone"
                    dataKey="left"
                    name="Attrition"
                    stackId="2"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                  <Area
                    type="monotone"
                    dataKey="net"
                    name="Net Change"
                    stroke="#ffc658"
                    fill="#ffc658"
                  />
                </AreaChart>
              </ResponsiveContainer>
            }
          />
        </Grid>

        {/* Performance Distribution */}
        <Grid item xs={12} md={4}>
          <ChartCard
            title="Performance Rating Distribution"
            subheader="Employee performance overview"
            height={350}
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label
                  >
                    {performanceDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} employees`, ``]} />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                  />
                </PieChart>
              </ResponsiveContainer>
            }
          />
        </Grid>

        {/* Salary Distribution */}
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Salary Distribution"
            subheader="Number of employees by salary range"
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salaryDistributionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" name="Employees" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            }
          />
        </Grid>

        {/* Average Salary by Department */}
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Average Salary by Department"
            subheader="Annual average salary in Indian Rupees (₹)"
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salaryByDepartment}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      `₹${value.toLocaleString()}`,
                      `Average Salary`,
                    ]}
                  />
                  <Bar dataKey="value" name="Average Salary" fill="#9c27b0" />
                </BarChart>
              </ResponsiveContainer>
            }
          />
        </Grid>
        {/* Gender and Department Distribution */}
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Gender Distribution"
            subheader="Employee demographics"
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label
                  >
                    <Cell fill="#1976d2" />
                    <Cell fill="#9c27b0" />
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      `${value} employees (${Math.round(
                        (value / employees.length) * 100
                      )}%)`,
                      name,
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard
            title="Department Distribution"
            subheader="Employee count by department"
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label
                  >
                    {departmentDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} employees`, name]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            }
          />
        </Grid>

        {/* Location Distribution */}
        <Grid item xs={12}>
          <ChartCard
            title="Employee Location Distribution"
            subheader="Employees by office location"
            height={350}
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      name: "Bangalore",
                      value: employees.filter(
                        (emp) => emp.location === "Bangalore"
                      ).length,
                    },
                    {
                      name: "Mumbai",
                      value: employees.filter(
                        (emp) => emp.location === "Mumbai"
                      ).length,
                    },
                    {
                      name: "Delhi",
                      value: employees.filter((emp) => emp.location === "Delhi")
                        .length,
                    },
                    {
                      name: "Hyderabad",
                      value: employees.filter(
                        (emp) => emp.location === "Hyderabad"
                      ).length,
                    },
                    {
                      name: "Chennai",
                      value: employees.filter(
                        (emp) => emp.location === "Chennai"
                      ).length,
                    },
                    {
                      name: "Pune",
                      value: employees.filter((emp) => emp.location === "Pune")
                        .length,
                    },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Employees" fill="#2e7d32" />
                </BarChart>
              </ResponsiveContainer>
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Analytics;
