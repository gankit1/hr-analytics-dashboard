import { v4 as uuidv4 } from "uuid";
import { addDays, subDays, subMonths, subYears } from "date-fns";

// Mock user data for authentication
export const mockUsers = [
  {
    id: "1",
    name: "John Admin",
    email: "admin@example.com",
    password: "password123", // In a real app, this would be hashed
    role: "admin",
    avatar: "https://mui.com/static/images/avatar/1.jpg",
  },
];

// Mock departments
export const mockDepartments = [
  {
    id: "1",
    name: "Engineering",
    manager: "Alex Johnson",
    budget: 1200000,
    employeeCount: 32,
    location: "Bangalore",
  },
  {
    id: "2",
    name: "Marketing",
    manager: "Sarah Williams",
    budget: 800000,
    employeeCount: 18,
    location: "Mumbai",
  },
  {
    id: "3",
    name: "Human Resources",
    manager: "Michael Brown",
    budget: 500000,
    employeeCount: 12,
    location: "Delhi",
  },
  {
    id: "4",
    name: "Finance",
    manager: "Emily Davis",
    budget: 900000,
    employeeCount: 15,
    location: "Hyderabad",
  },
  {
    id: "5",
    name: "Product",
    manager: "David Wilson",
    budget: 1000000,
    employeeCount: 22,
    location: "Chennai",
  },
];

// Generate mock employees
const generateEmployees = () => {
  const designations = [
    "Software Engineer",
    "Senior Developer",
    "Product Manager",
    "UX Designer",
    "Data Analyst",
    "HR Specialist",
    "Financial Analyst",
    "Marketing Specialist",
  ];

  const statuses = ["Active", "On Leave", "Remote", "Contract"];
  const locations = [
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Hyderabad",
    "Chennai",
    "Pune",
  ];

  const randomDate = (start, end) => {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ).toISOString();
  };

  const employees = [];

  // Sample employee names and email patterns
  const sampleEmployees = [
    { first: "Rahul", last: "Sharma", gender: "male" },
    { first: "Priya", last: "Patel", gender: "female" },
    { first: "Amit", last: "Kumar", gender: "male" },
    { first: "Ananya", last: "Singh", gender: "female" },
    { first: "Vikram", last: "Mehta", gender: "male" },
    { first: "Neha", last: "Gupta", gender: "female" },
    { first: "Sanjay", last: "Verma", gender: "male" },
    { first: "Divya", last: "Saxena", gender: "female" },
    { first: "Ravi", last: "Reddy", gender: "male" },
    { first: "Sneha", last: "Agarwal", gender: "female" },
    { first: "Ajay", last: "Tiwari", gender: "male" },
    { first: "Pooja", last: "Mishra", gender: "female" },
    { first: "Raj", last: "Malhotra", gender: "male" },
    { first: "Meera", last: "Joshi", gender: "female" },
    { first: "Arjun", last: "Nair", gender: "male" },
    { first: "Kavita", last: "Rao", gender: "female" },
    { first: "Nitin", last: "Chauhan", gender: "male" },
    { first: "Aisha", last: "Khan", gender: "female" },
    { first: "Kunal", last: "Shah", gender: "male" },
    { first: "Swati", last: "Desai", gender: "female" },
  ];

  // Generate 40 employees from the sample data with repeated use as needed
  for (let i = 0; i < 40; i++) {
    const sampleIndex = i % sampleEmployees.length;
    const { first, last, gender } = sampleEmployees[sampleIndex];

    const departmentId =
      mockDepartments[Math.floor(Math.random() * mockDepartments.length)].id;
    const designation =
      designations[Math.floor(Math.random() * designations.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];

    const startDate = subYears(new Date(), Math.floor(Math.random() * 5) + 1);
    const hireDate = randomDate(startDate, subMonths(new Date(), 1));

    const baseSalary = 50000 + Math.floor(Math.random() * 100000);

    const performance = Math.floor(Math.random() * 5) + 1; // 1-5 rating

    employees.push({
      id: uuidv4(),
      firstName: first,
      lastName: last,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@company.com`,
      gender,
      departmentId,
      designation,
      salary: baseSalary,
      hireDate,
      status,
      location,
      phoneNumber: `+91${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      performance,
      avatar: `https://mui.com/static/images/avatar/${(i % 8) + 1}.jpg`,
    });
  }

  return employees;
};

export const mockEmployees = generateEmployees();

// Attendance data for the last 30 days
export const generateAttendanceData = () => {
  const data = [];
  let date = subDays(new Date(), 30);

  while (date <= new Date()) {
    const totalEmployees = mockEmployees.length;
    const present = totalEmployees - Math.floor(Math.random() * 10); // Random absences
    const percentage = (present / totalEmployees) * 100;

    data.push({
      date: date.toISOString().split("T")[0],
      present,
      absent: totalEmployees - present,
      percentage: percentage.toFixed(1),
    });

    date = addDays(date, 1);
  }

  return data;
};

export const attendanceData = generateAttendanceData();

// Department performance data
export const departmentPerformanceData = mockDepartments.map((dept) => {
  return {
    department: dept.name,
    performance: parseFloat((3 + Math.random() * 2).toFixed(1)), // 3-5 rating
    employeeSatisfaction: parseFloat((3 + Math.random() * 2).toFixed(1)), // 3-5 rating
    budget: dept.budget,
    expenses: Math.floor(dept.budget * (0.7 + Math.random() * 0.3)), // 70-100% of budget
  };
});

// Generate hiring data for the past year
export const generateHiringData = () => {
  const data = [];
  let date = subYears(new Date(), 1);

  for (let i = 0; i < 12; i++) {
    const month = new Date(date).toLocaleString("default", { month: "short" });
    const hired = Math.floor(Math.random() * 8) + 1;
    const left = Math.floor(Math.random() * 5);

    data.push({
      month,
      hired,
      left,
      net: hired - left,
    });

    date = addDays(date, 30); // Approximation of a month
  }

  return data;
};

export const hiringData = generateHiringData();

// Salary distribution data
export const salaryDistributionData = [
  {
    range: "50k-70k",
    count: mockEmployees.filter(
      (emp) => emp.salary >= 50000 && emp.salary < 70000
    ).length,
  },
  {
    range: "70k-90k",
    count: mockEmployees.filter(
      (emp) => emp.salary >= 70000 && emp.salary < 90000
    ).length,
  },
  {
    range: "90k-110k",
    count: mockEmployees.filter(
      (emp) => emp.salary >= 90000 && emp.salary < 110000
    ).length,
  },
  {
    range: "110k-130k",
    count: mockEmployees.filter(
      (emp) => emp.salary >= 110000 && emp.salary < 130000
    ).length,
  },
  {
    range: "130k+",
    count: mockEmployees.filter((emp) => emp.salary >= 130000).length,
  },
];

// Gender distribution
export const genderDistribution = [
  {
    name: "Male",
    value: mockEmployees.filter((emp) => emp.gender === "male").length,
  },
  {
    name: "Female",
    value: mockEmployees.filter((emp) => emp.gender === "female").length,
  },
];

// Department distribution
export const departmentDistribution = mockDepartments.map((dept) => ({
  name: dept.name,
  value: mockEmployees.filter((emp) => emp.departmentId === dept.id).length,
}));
