export function fetchData(url, callback, method = "GET", body = null) {
  const headers = { Accept: "application/json" };

  if (method === "POST" || method === "PUT") {
    headers["Content-Type"] = "application/json";
  }

  const token = localStorage.getItem("jwtToken");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  fetch(url, options)
    .then(async (res) => {
      const data = await res.json().catch(() => null); // Safe JSON parse
      if (!res.ok) {
        callback(null, {
          status: res.status,
          message: data?.detail || res.statusText,
        });
      } else {
        callback(data, null);
      }
    })
    .catch((err) => {
      console.error("Network error:", err);
      callback(null, { status: 500, message: "Network error" });
    });
}
