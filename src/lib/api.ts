// utils/api.ts
import { BACKEND_URL } from "./constant";

export async function getData(endpoint: string) {
  try {
    const baseUrl = BACKEND_URL;
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
    console.log(res)
      throw new Error(`GET ${endpoint} failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching data:", error,"\nEnpoint: ",endpoint);
    throw error;
  }
}

export async function postData(endpoint: string, data: any) {
  try {
    const baseUrl = BACKEND_URL
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

    const resdata = await res.json();
    console.log(resdata);
    
    if (!res.ok) {
      throw new Error(`POST ${endpoint} failed: ${res.status} ${res.statusText}`);
    }
    return resdata;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}


export async function putData(endpoint: string, data: any) {
  try {
    const baseUrl = BACKEND_URL
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_SERVER_URL is not defined in .env");
    }
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      throw new Error(`PUT ${endpoint} failed: ${res.status} ${res.statusText}`);
    }
    const resdata = await res.json();
    console.log(resdata);
    return resdata;
  } catch (error) {
    console.error("Error putting data:", error);
    throw error;
  }
}

export async function deleteData(endpoint: string) {
  try {
    const baseUrl = BACKEND_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_SERVER_URL is not defined in .env");
    }

    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`DELETE ${endpoint} failed: ${res.status} ${res.statusText}`);
    }

    const resdata = await res.json();
    console.log("Deleted:", resdata);
    return resdata;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
}


export async function patchData(endpoint: string, data: any) {
  const res = await fetch(`${BACKEND_URL}${endpoint}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`PATCH ${endpoint} failed: ${res.status}`);
  return res.json();
}
