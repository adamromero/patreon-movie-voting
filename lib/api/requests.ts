// fetch full list of requests
export async function fetchRequests() {
   const res = await fetch("/api/requests");
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
   const res = await fetch("/api/requests/user/monthly");
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

   if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
   }

   return res.json();
}

export async function addRequestVote(id: string) {
   const res = await fetch(`/api/requests/${id}`, {
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
