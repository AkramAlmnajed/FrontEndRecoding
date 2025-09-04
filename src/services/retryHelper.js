export const fetchWithRetry = async (
  requestFn,
  retries = 5,
  delay = 1000,
  requireToken = false
) => {
  let attempt = 0;

  while (attempt < retries) {
    try {
      if (requireToken) {
        const startTime = Date.now();
        let token = localStorage.getItem("accessToken");

        while (!token && Date.now() - startTime < retries * delay) {
          await new Promise((res) => setTimeout(res, 100)); // poll every 100ms
          token = localStorage.getItem("accessToken");
        }

        if (!token) throw new Error("Token still not available after waiting");
      }

      return await requestFn();

    } catch (error) {
      attempt++;

      const shouldRetry =
        attempt < retries &&
        (
          error.code === "ERR_NETWORK" || 
          error.message.includes("Token") || 
          (error.response && error.response.status >= 500)
        );

      if (!shouldRetry) throw error;

      await new Promise((res) => setTimeout(res, delay));
    }
  }
};
