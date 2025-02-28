import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { mockEmployees, mockDepartments } from "../data/mockData";

const EmployeeContext = createContext();

export const useEmployees = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, these would be API calls
    const storedEmployees = localStorage.getItem("hr_dashboard_employees");
    const storedDepartments = localStorage.getItem("hr_dashboard_departments");

    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    } else {
      setEmployees(mockEmployees);
      localStorage.setItem(
        "hr_dashboard_employees",
        JSON.stringify(mockEmployees)
      );
    }

    if (storedDepartments) {
      setDepartments(JSON.parse(storedDepartments));
    } else {
      setDepartments(mockDepartments);
      localStorage.setItem(
        "hr_dashboard_departments",
        JSON.stringify(mockDepartments)
      );
    }

    setLoading(false);
  }, []);

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: uuidv4(),
      hireDate: new Date().toISOString(),
    };
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    localStorage.setItem(
      "hr_dashboard_employees",
      JSON.stringify(updatedEmployees)
    );
    return newEmployee;
  };

  const updateEmployee = (id, updatedData) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === id ? { ...employee, ...updatedData } : employee
    );
    setEmployees(updatedEmployees);
    localStorage.setItem(
      "hr_dashboard_employees",
      JSON.stringify(updatedEmployees)
    );
  };

  const deleteEmployee = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem(
      "hr_dashboard_employees",
      JSON.stringify(updatedEmployees)
    );
  };

  const getEmployeeById = (id) => {
    return employees.find((employee) => employee.id === id);
  };

  const getDepartmentById = (id) => {
    return departments.find((department) => department.id === id);
  };

  const addDepartment = (department) => {
    const newDepartment = {
      ...department,
      id: uuidv4(),
    };
    const updatedDepartments = [...departments, newDepartment];
    setDepartments(updatedDepartments);
    localStorage.setItem(
      "hr_dashboard_departments",
      JSON.stringify(updatedDepartments)
    );
    return newDepartment;
  };

  const updateDepartment = (id, updatedData) => {
    const updatedDepartments = departments.map((department) =>
      department.id === id ? { ...department, ...updatedData } : department
    );
    setDepartments(updatedDepartments);
    localStorage.setItem(
      "hr_dashboard_departments",
      JSON.stringify(updatedDepartments)
    );
  };

  const deleteDepartment = (id) => {
    const updatedDepartments = departments.filter(
      (department) => department.id !== id
    );
    setDepartments(updatedDepartments);
    localStorage.setItem(
      "hr_dashboard_departments",
      JSON.stringify(updatedDepartments)
    );
  };

  const value = {
    employees,
    departments,
    loading,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
    getDepartmentById,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};
