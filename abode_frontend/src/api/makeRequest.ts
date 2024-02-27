const BASE_URL: string = `http://localhost:3001`;

export const makeRequest = async (path: string, method: string, data?: any | null) => {
  const token: string = sessionStorage.getItem("token") ?? ""
  const body = data ? JSON.stringify(data) : null
  try {
    const response = await fetch(`${BASE_URL}/${path}`, {
      method,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body
    });

    const jsonResponse = await response.json();
    return jsonResponse
  } catch (e) {
    console.log(e);
  }
}