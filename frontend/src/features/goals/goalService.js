import axios from "axios";
import { BASE_URL } from "../../../config";
const API_URL = `${BASE_URL}/api/goals/`;

// Create new goal
const createGoal = async (goalData) => {
  const response = await axios.post(API_URL, goalData);
  return response.data;
};

// Get user goals
const getGoals = async () => {
  const response = await axios.get(API_URL);
  // console.log(response.data.data, "getgoals");
  return response.data;
};

// Delete goal
const deleteGoal = async (goalId) => {
  const response = await axios.delete(API_URL + goalId);
  // console.log(response.data, "deletegoals");
  return response.data;
};

const updateGoal = async (goalId) => {
  const response = await axios.put(API_URL + goalId, null);
  // console.log(response.data, "updategoals");
  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
  updateGoal,
};

export default goalService;
