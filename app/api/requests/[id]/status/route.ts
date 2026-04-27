import { NextResponse } from "next/server";
import { updateStatus } from "@/lib/services/requests/updateStatus";
import { getCurrentUser } from "@/lib/session";

export async function PUT(
   req: Request,
   { params }: { params: { id: string } },
) {
   const user = await getCurrentUser();

   if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   const status = await req.json();

   try {
      const result = await updateStatus({ requestId: params.id, status });
      return NextResponse.json(result);
   } catch (error) {
      return NextResponse.json({
         error: "Unable to update movie vote in the database.",
      });
   }
}
