import { NextResponse } from "next/server";
import { updateHoliday } from "@/lib/services/requests/updateHoliday";
import { getCurrentUser } from "@/lib/session";

export async function PUT(
   req: Request,
   { params }: { params: { id: string } },
) {
   const user = await getCurrentUser();

   if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   const holiday = await req.json();

   try {
      const result = await updateHoliday({ requestId: params.id, holiday });
      return NextResponse.json(result);
   } catch (error) {
      return NextResponse.json({
         error: "Unable to update movie vote in the database.",
      });
   }
}
