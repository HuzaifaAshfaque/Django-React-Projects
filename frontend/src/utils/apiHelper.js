import API from "./api";

export const apiRequest = async (method, url, data = null) => {
  let accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");

  try {
    // Try the request first
    const response = await API({
      method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    // If access token expired (401)
    if (err.response?.status === 401 && refreshToken) {
      try {
        // Request new access token
        const refreshResponse = await API.post("token/refresh/", {
          refresh: refreshToken,
        });

        accessToken = refreshResponse.data.access;
        localStorage.setItem("access", accessToken);

        // Retry original request with new access token
        const retryResponse = await API({
          method,
          url,
          data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        return retryResponse.data;
      } catch (refreshErr) {
        // Refresh token expired → logout
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        window.location.href = "/login";
        throw new Error("Session expired. Please login again.");
      }
    } else {
      throw err;
    }
  }
};
