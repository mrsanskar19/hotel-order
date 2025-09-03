// utils/api.ts

export async function getData(endpoint: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_SERVER_URL is not defined in .env");
    }

    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // avoid stale cache
    });

    if (!res.ok) {
      throw new Error(`GET ${endpoint} failed: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function postData(endpoint: string, data: any) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_SERVER_URL is not defined in .env");
    }

    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`POST ${endpoint} failed: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}


