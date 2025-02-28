/**
 * HR Analytics Dashboard - Utility Helper Functions
 *
 * This file contains utility functions for formatting, data manipulation,
 * and other common operations used throughout the application.
 *
 * Created by: AnkitKumarGupta
 * Last updated: 2025-02-28
 */

import { format, formatDistance, parseISO } from "date-fns";

/**
 * Format a date value to a readable date string
 * @param {Date|string} date - Date object or ISO date string
 * @param {string} formatStr - Format string for date-fns
 * @returns {string} Formatted date string
 */
export const formatDate = (date, formatStr = "MMM dd, yyyy") => {
  if (!date) return "N/A";
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch (err) {
    console.error("Error formatting date:", err);
    return "Invalid Date";
  }
};

/**
 * Calculate time elapsed since a given date
 * @param {Date|string} date - Date object or ISO date string
 * @returns {string} Human-readable time elapsed
 */
export const timeAgo = (date) => {
  if (!date) return "N/A";
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return formatDistance(dateObj, new Date(), { addSuffix: true });
  } catch (err) {
    console.error("Error calculating time ago:", err);
    return "Unknown";
  }
};

/**
 * Format currency values
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'INR')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = "INR") => {
  if (amount === undefined || amount === null) return "N/A";

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
};

/**
 * Calculate percentage change between two values
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {number} Percentage change
 */
export const calculatePercentageChange = (current, previous) => {
  if (!previous) return 100; // If previous is 0 or null, consider it a 100% increase
  return ((current - previous) / previous) * 100;
};

/**
 * Truncate text to a specific length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 100) => {
  if (!text) return "";
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

/**
 * Generate a random color
 * @returns {string} Random hex color
 */
export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

/**
 * Convert array data to format required by charts
 * @param {Array} data - Array of data objects
 * @param {string} labelKey - Key to use for labels
 * @param {string} valueKey - Key to use for values
 * @returns {Array} Formatted chart data
 */
export const formatChartData = (data, labelKey, valueKey) => {
  if (!data || !Array.isArray(data)) return [];

  return data.map((item) => ({
    name: item[labelKey],
    value: item[valueKey],
  }));
};

/**
 * Group array items by a specific key
 * @param {Array} array - Array of objects
 * @param {string} key - Key to group by
 * @returns {Object} Grouped object
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Generate a simple hash from a string
 * @param {string} str - String to hash
 * @returns {number} Hash number
 */
export const simpleHash = (str) => {
  let hash = 0;
  if (!str || str.length === 0) return hash;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash);
};

/**
 * Get initials from a name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (name) => {
  if (!name) return "NA";

  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

/**
 * Convert camelCase to Title Case
 * @param {string} camelCase - camelCase string
 * @returns {string} Title Case string
 */
export const camelCaseToTitleCase = (camelCase) => {
  if (!camelCase) return "";

  const result = camelCase.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

/**
 * Check if an object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} True if empty
 */
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Get age from date of birth
 * @param {Date|string} dob - Date of birth
 * @returns {number} Age in years
 */
export const calculateAge = (dob) => {
  if (!dob) return 0;

  try {
    const birthDate = typeof dob === "string" ? parseISO(dob) : dob;
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  } catch (err) {
    console.error("Error calculating age:", err);
    return 0;
  }
};
