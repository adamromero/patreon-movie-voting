import { RequestVoteResponse } from "@/app/types/request";

// fetch full list of requests
export async function fetchAllRequests() {
   const res = await fetch("/api/requests");
   if (!res.ok) throw new Error("Failed to fetch requests");
   return res.json();
}

export async function fetchRequestsByParams(params: {
   page?: number;
   limit?: number;
   title?: string;
   rating?: string;
   votes?: string;
   director?: string;
   actor?: string;
   composer?: string;
   genre?: string;
   type?: string;
   status?: string;
   myrequests?: string;
   sort?: string;
   sortstatus?: string;
}) {
   const searchParams = new URLSearchParams();

   if (params?.page) {
      searchParams.set("page", String(params.page));
   }

   if (params?.limit) {
      searchParams.set("limit", String(params.limit));
   }

   if (params?.title) {
      searchParams.set("title", params.title);
   }

   if (params?.director) {
      searchParams.set("director", params.director);
   }

   if (params?.actor) {
      searchParams.set("actor", params.actor);
   }

   if (params?.composer) {
      searchParams.set("composer", params.composer);
   }

   if (params?.genre) {
      searchParams.set("genre", params.genre);
   }

   if (params?.type) {
      searchParams.set("type", params.type);
   }

   if (params?.status) {
      searchParams.set("status", params.status);
   }

   if (params?.myrequests) {
      searchParams.set("myrequests", params.myrequests);
   }

   if (params?.sort) {
      searchParams.set("sort", params.sort);
   }

   if (params?.sortstatus) {
      searchParams.set("sortstatus", params.sortstatus);
   }

   if (params?.title) {
      searchParams.set("title", params.title);
   }

   if (params?.rating) {
      searchParams.set("rating", params.rating);
   }

   if (params?.votes) {
      searchParams.set("votes", params.votes);
   }

   const res = await fetch(`/api/requests?${searchParams}`);
   if (!res.ok) throw new Error("Failed to fetch requests");
   return res.json();
}

// fetch list of requests made by current user
export async function fetchUserRequests() {
   const res = await fetch("/api/requests/user");
   if (!res.ok) throw new Error("Failed to fetch requests");
   return res.json();
}

// fetch list of requests made by current user this month
export async function fetchMonthlyRequests() {
   const res = await fetch("/api/requests/user/monthly");
   if (!res.ok) throw new Error("Failed to fetch requests");
   return res.json();
}

// fetch a total summary of requests made by current user this month
export async function fetchMonthlySummary() {
   const res = await fetch("/api/requests/user/monthly/summary");
   if (!res.ok) throw new Error("Failed to fetch requests");
   return res.json();
}

// add a request to the list
export async function addRequestApi(data: any) {
   const res = await fetch("/api/requests", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
         "Content-Type": "application/json",
      },
   });

   const payload = await res.json().catch(() => null);
   if (!res.ok) {
      throw new Error(payload?.error || "Failed to add request");
   }

   return payload;
}

export async function addRequestVote(id: string) {
   const res = await fetch(`/api/requests/${id}/vote`, {
      method: "PUT",
   });

   const data = await res.json();

   if (!res.ok) {
      throw new Error(data.error || "Failed to add vote");
   }

   return data;
}

export async function removeRequestVote(id: string) {
   const res = await fetch(`/api/requests/${id}/vote`, {
      method: "DELETE",
   });

   const data = await res.json();

   if (!res.ok) {
      throw new Error(data.error || "Failed to remove vote");
   }

   return data;
}

// delete request based on id
export async function deleteRequestApi(id: string) {
   const res = await fetch(`/api/requests/${id}`, {
      method: "DELETE",
   });
   if (!res.ok) throw new Error("Failed to delete");
   return res.json();
}

// update reaction link of request based on id
export async function updateRequestLink(id: string, links: any) {
   const res = await fetch(`/api/requests/${id}/link`, {
      method: "PUT",
      body: JSON.stringify(links),
      headers: {
         "Content-Type": "application/json",
      },
   });

   const data = await res.json();

   if (!res.ok) {
      throw new Error(data.error || "Failed to update request status");
   }

   return data;
}

// update holiday status of request based on id
export async function updateRequestHolidayStatus(id: string, holiday: any) {
   const res = await fetch(`/api/requests/${id}/holiday`, {
      method: "PUT",
      body: JSON.stringify(holiday),
      headers: {
         "Content-Type": "application/json",
      },
   });

   const data = await res.json();

   if (!res.ok) {
      throw new Error(data.error || "Failed to update request status");
   }

   return data;
}

// update watch status of request based on id
export async function updateRequestWatchStatus(id: string, status: any) {
   const res = await fetch(`/api/requests/${id}/status`, {
      method: "PUT",
      body: JSON.stringify(status),
      headers: {
         "Content-Type": "application/json",
      },
   });

   const data = await res.json();

   if (!res.ok) {
      throw new Error(data.error || "Failed to update request status");
   }

   return data;
}

export async function lookupRequests(
   items: {
      id: number;
      mediaType: string;
   }[],
) {
   const res = await fetch("/api/requests/lookup", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
   });

   return res.json();
}
