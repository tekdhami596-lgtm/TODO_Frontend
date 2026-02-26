import api from "../api/axios"
export const userService = {
  getAllUsers: async () => {
    const res = await api.get("/users");
    return res.data;
  },
};
