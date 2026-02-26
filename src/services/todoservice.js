// services/todoservice.js
import api from "../api/axios"; // Axios instance that attaches token

export const todoService = {
  // Get all todos
  getAllTodos: async () => {
    try {
      const response = await api.get("/todos");
      return response.data;
    } catch (error) {
      console.error("Error fetching todos:", error.response?.data || error);
      throw error.response?.data || error.message;
    }
  },

  // Get single todo
  getTodoById: async (id) => {
    try {
      const response = await api.get(`/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching todo:", error.response?.data || error);
      throw error.response?.data || error.message;
    }
  },

  // Create todo
  createTodo: async ({ title }) => {
    try {
      const response = await api.post("/todos", { title });
      return response.data;
    } catch (error) {
      console.error("Error creating todo:", error.response?.data || error);
      throw error.response?.data || error.message;
    }
  },

  // Update todo
  updateTodo: async (id, todoData) => {
    console.log("todoData",todoData);
    try {
      const response = await api.put(`/todos/${id}`, todoData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating todo:", error.response?.data || error);
      throw error.response?.data || error.message;
    }
  },

  // Delete todo
  deleteTodo: async (id) => {
    try {
      const response = await api.delete(`/todos/${id}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete todo";

      console.error("Error deleting todo:", message);

      throw new Error(message);
    }
  },
};
