const getApiBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
};

const API_BASE_URL = getApiBaseUrl();

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const authApi = {
  // Auth APIs
  register: async (userData) => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });
    return handleResponse(response);
  },

  registerRider: async (riderData) => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/auth/rider-register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(riderData),
      credentials: "include",
    });
    return handleResponse(response);
  },

  login: async (email, password) => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    return handleResponse(response);
  },

  logout: async () => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });
    return handleResponse(response);
  },

  getMe: async () => {
    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      // Handle 401 Unauthorized gracefully (user not logged in)
      if (response.status === 401) {
        return { success: false, message: "Not logged in" };
      }

      return handleResponse(response);
    } catch (error) {
      console.error("API Error in getMe:", error);
      throw error;
    }
  },

  // Admin APIs
  getUsers: async (query = "") => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/admin/users${query ? `?${query}` : ""}`, {
      method: "GET",
      credentials: "include",
    });
    return handleResponse(response);
  },

  getUser: async (id) => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/admin/users/${id}`, {
      method: "GET",
      credentials: "include",
    });
    return handleResponse(response);
  },

  updateUser: async (id, updateData) => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/admin/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
      credentials: "include",
    });
    return handleResponse(response);
  },

  deleteUser: async (id) => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/admin/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return handleResponse(response);
  },

  getStats: async () => {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/admin/stats`, {
      method: "GET",
      credentials: "include",
    });
    return handleResponse(response);
  },
};
