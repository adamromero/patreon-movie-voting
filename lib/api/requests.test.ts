import {
   addRequestApi,
   removeRequestVote,
   fetchRequests,
   updateRequestWatchStatus,
} from "@/lib/api/requests";

describe("lib/api/requests", () => {
   const mockFetch = jest.fn();

   beforeEach(() => {
      mockFetch.mockReset();
      global.fetch = mockFetch as unknown as typeof fetch;
   });

   it("fetchRequests calls the expected endpoint and returns JSON", async () => {
      const payload = [{ id: "abc" }];
      mockFetch.mockResolvedValue({
         ok: true,
         json: jest.fn().mockResolvedValue(payload),
      });

      const result = await fetchRequests();

      expect(mockFetch).toHaveBeenCalledWith("/api/requests");
      expect(result).toEqual(payload);
   });

   it("addRequestApi posts JSON body and returns payload", async () => {
      const data = { title: "Alien" };
      const payload = { id: "1", ...data };
      mockFetch.mockResolvedValue({
         ok: true,
         json: jest.fn().mockResolvedValue(payload),
      });

      const result = await addRequestApi(data);

      expect(mockFetch).toHaveBeenCalledWith("/api/requests", {
         method: "POST",
         body: JSON.stringify(data),
         headers: { "Content-Type": "application/json" },
      });
      expect(result).toEqual(payload);
   });

   it("updateRequestWatchStatus throws API error messages", async () => {
      mockFetch.mockResolvedValue({
         ok: false,
         json: jest.fn().mockResolvedValue({ error: "Bad status" }),
      });

      await expect(
         updateRequestWatchStatus("request-1", { status: "seen" }),
      ).rejects.toThrow("Bad status");
   });
});
