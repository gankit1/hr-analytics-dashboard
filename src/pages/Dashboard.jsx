import React from "react";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import {
  PeopleAlt as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Person as PersonIcon,
  AttachMoney as MoneyIcon,
  Event as EventIcon,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { format } from "date-fns";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import { useEmployees } from "../context/EmployeeContext";
import {
  hiringData,
  attendanceData,
  departmentDistribution,
  genderDistribution,
} from "../data/mockData";

const Dashboard = () => {
  const { employees, departments } = useEmployees();

  // Calculate statistics
  const totalEmployees = employees.length;
  const newEmployees = employees.filter(
    (emp) =>
      new Date(emp.hireDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  ).length;
  const activeEmployees = employees.filter(
    (emp) => emp.status === "Active"
  ).length;

  const averageSalary =
    employees.reduce((sum, employee) => sum + employee.salary, 0) /
    employees.length;

  // Calculate department sizes for the table
  const departmentSizes = departments.map((dept) => ({
    id: dept.id,
    name: dept.name,
    manager: dept.manager,
    count: employees.filter((emp) => emp.departmentId === dept.id).length,
    budget: dept.budget,
  }));

  // Get upcoming birthdays (in a real app this would come from actual data)
  const upcomingEvents = [
    {
      type: "Birthday",
      name: "Rahul Sharma",
      date: "2025-03-01",
      avatar: "https://mui.com/static/images/avatar/1.jpg",
    },
    {
      type: "Work Anniversary",
      name: "Priya Patel",
      date: "2025-03-02",
      years: 3,
      avatar: "https://mui.com/static/images/avatar/2.jpg",
    },
    {
      type: "Training",
      name: "Leadership Workshop",
      date: "2025-03-05",
      participants: 12,
    },
    { type: "Holiday", name: "Holi", date: "2025-03-10" },
    {
      type: "Birthday",
      name: "Amit Kumar",
      date: "2025-03-12",
      avatar: "https://mui.com/static/images/avatar/3.jpg",
    },
  ];

  // Colors for the pie chart
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#83a6ed",
  ];

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome back! Here's what's happening with your team today.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stat Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Employees"
            value={totalEmployees}
            icon={<PeopleIcon />}
            color="primary"
            subtitle="Overall workforce"
            change={2.5}
            changePeriod="last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Employees"
            value={activeEmployees}
            icon={<PersonIcon />}
            color="success"
            subtitle="Currently working"
            change={-1.2}
            changePeriod="last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="New Hires"
            value={newEmployees}
            icon={<TrendingUpIcon />}
            color="info"
            subtitle="Last 30 days"
            change={12.5}
            changePeriod="previous period"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Average Salary"
            value={`₹${Math.floor(averageSalary).toLocaleString()}`}
            icon={<MoneyIcon />}
            color="warning"
            subtitle="Per employee"
            change={3.2}
            changePeriod="last year"
          />
        </Grid>

        {/* Attendance Chart */}
        <Grid item xs={12} lg={8}>
          <ChartCard
            title="Attendance Trends"
            subheader="Last 30 days"
            tooltip="Daily attendance percentage for the last 30 days"
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={attendanceData}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => format(new Date(date), "dd MMM")}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    tickFormatter={(value) => `${value}%`}
                    domain={[80, 100]}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Attendance"]}
                    labelFormatter={(date) =>
                      format(new Date(date), "dd MMM yyyy")
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="percentage"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            }
          />
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} lg={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 1, p: 0 }}>
              <Box sx={{ p: 2, pb: 0 }}>
                <Typography variant="h6" gutterBottom>
                  Upcoming Events
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Celebrations and important dates
                </Typography>
              </Box>
              <List>
                {upcomingEvents.map((event, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor:
                              event.type === "Birthday"
                                ? "primary.main"
                                : event.type === "Work Anniversary"
                                ? "success.main"
                                : event.type === "Training"
                                ? "info.main"
                                : "warning.main",
                          }}
                          src={event.avatar}
                        >
                          {!event.avatar && <EventIcon />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="subtitle2">
                              {event.name}
                            </Typography>
                            <Chip
                              label={event.type}
                              size="small"
                              color={
                                event.type === "Birthday"
                                  ? "primary"
                                  : event.type === "Work Anniversary"
                                  ? "success"
                                  : event.type === "Training"
                                  ? "info"
                                  : "warning"
                              }
                            />
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {format(new Date(event.date), "MMMM dd, yyyy")}
                            </Typography>
                            {event.years && (
                              <Typography
                                component="span"
                                variant="body2"
                                sx={{ display: "block" }}
                              >
                                {event.years} years
                              </Typography>
                            )}
                            {event.participants && (
                              <Typography
                                component="span"
                                variant="body2"
                                sx={{ display: "block" }}
                              >
                                {event.participants} participants
                              </Typography>
                            )}
                          </>
                        }
                      />
                    </ListItem>
                    {index < upcomingEvents.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Hiring Trends */}
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Hiring Trends"
            subheader="Past 12 months"
            tooltip="Monthly hiring and attrition data"
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={hiringData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="hired" name="New Hires" fill="#1976d2" />
                  <Bar dataKey="left" name="Attrition" fill="#ef5350" />
                  <Bar dataKey="net" name="Net Change" fill="#66bb6a" />
                </BarChart>
              </ResponsiveContainer>
            }
          />
        </Grid>

        {/* Department Distribution */}
        <Grid item xs={12} sm={6} md={3}>
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
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={(entry) => entry.name}
                  >
                    {departmentDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                  />
                  <Tooltip
                    formatter={(value, name) => [`${value} employees`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            }
          />
        </Grid>

        {/* Gender Distribution */}
        <Grid item xs={12} sm={6} md={3}>
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
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={(entry) => entry.name}
                  >
                    <Cell fill="#1976d2" />
                    <Cell fill="#9c27b0" />
                  </Pie>
                  <Legend />
                  <Tooltip
                    formatter={(value, name) => [`${value} employees`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            }
          />
        </Grid>

        {/* Top Departments Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Department Overview
              </Typography>
              <Box sx={{ overflowX: "auto" }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    Department
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Manager
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Employees
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Budget
                  </Typography>

                  {departmentSizes.map((dept) => (
                    <React.Fragment key={dept.id}>
                      <Typography variant="body2">{dept.name}</Typography>
                      <Typography variant="body2">{dept.manager}</Typography>
                      <Typography variant="body2">{dept.count}</Typography>
                      <Typography variant="body2">
                        ₹{dept.budget.toLocaleString()}
                      </Typography>
                    </React.Fragment>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
