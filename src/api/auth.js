// Authentication API logic removed
export const authApi = {
  register: async () => ({ success: false, message: "Auth removed" }),
  registerRider: async () => ({ success: false, message: "Auth removed" }),
  login: async () => ({ success: false, message: "Auth removed" }),
  logout: async () => ({ success: false, message: "Auth removed" }),
  getMe: async () => ({ success: false, message: "Auth removed" }),
  getUsers: async () => ({ success: true, data: [] }),
  getUser: async () => ({ success: false, message: "Auth removed" }),
  updateUser: async () => ({ success: false, message: "Auth removed" }),
  deleteUser: async () => ({ success: false, message: "Auth removed" }),
  getStats: async () => ({ success: true, data: {} }),
};
